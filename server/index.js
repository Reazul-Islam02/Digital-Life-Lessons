const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const helmet = require('helmet');
const morgan = require('morgan');
const rateLimit = require('express-rate-limit');
const errorHandler = require('./utils/errorHandler');
const AppError = require('./utils/appError');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const app = express();
const port = process.env.PORT || 5000;

// Security Middlewares
app.use(helmet()); // Set security HTTP headers
app.use(morgan('dev')); // HTTP request logger

// Rate limiting
const limiter = rateLimit({
    max: 100, // Limit each IP to 100 requests per windowMs
    windowMs: 60 * 60 * 1000, // 1 hour
    message: 'Too many requests from this IP, please try again in an hour!'
});
app.use('/api', limiter);

// CORS configuration
app.use(cors({
    origin: (origin, callback) => {
        const allowedOrigins = [
            'http://localhost:5173',
            'http://localhost:5174',
            'http://localhost:5175',
            'https://assignment11-2.netlify.app',
            'https://assignment11-2-k4anmy2lj-reazul-islam02s-projects.vercel.app',
            'https://digital-life-lessons-f2ob.vercel.app',
            'https://zesty-medovik-503861.netlify.app',
            'https://digital-life-lessons01.netlify.app'
        ];
        const normalizedOrigin = origin?.replace(/\/$/, '');
        // Allow requests with no origin (e.g., mobile apps, Postman)
        if (!origin || allowedOrigins.includes(normalizedOrigin)) {
            callback(null, true);
        } else {
            callback(new Error(`CORS policy: origin ${origin} not allowed`));
        }
    },
    credentials: true
}));

// Webhook Route (Must be before express.json)
const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy';
const stripe = require('stripe')(stripeKey);
const User = require('./models/User');

app.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    } catch (err) {
        console.error('Webhook signature verification failed.', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    if (event.type === 'checkout.session.completed') {
        const session = event.data.object;
        const customerEmail = session.customer_email;

        if (customerEmail) {
            try {
                await User.findOneAndUpdate(
                    { email: customerEmail },
                    { isPremium: true }
                );
                console.log(`User ${customerEmail} upgraded to Premium.`);
            } catch (error) {
                console.error('Error updating user premium status:', error);
            }
        }
    }

    res.json({ received: true });
});

// JSON body parser
app.use(express.json({ limit: '10kb' }));

// Routes
const authRoutes = require('./routes/auth');
const lessonRoutes = require('./routes/lessons');
const paymentRoutes = require('./routes/payment');
const adminRoutes = require('./routes/admin');

app.use('/api', authRoutes);
app.use('/api', lessonRoutes);
app.use('/api', paymentRoutes);
app.use('/api', adminRoutes);

app.get('/', (req, res) => {
    res.send('Digital Life Lessons Server is Running');
});

// Handle undefined routes (Express 5 requires '/*path' instead of '*')
app.all('/{*path}', (req, res, next) => {
    next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

// Global Error Handler
app.use(errorHandler);

// MongoDB Connection
const uri = process.env.MONGODB_URI;
if (uri) {
    mongoose.connect(uri)
        .then(() => console.log('MongoDB connection established successfully'))
        .catch(err => console.error('MongoDB connection error:', err));
} else {
    console.warn("MONGODB_URI not found in .env");
}

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
