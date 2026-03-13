const stripeKey = process.env.STRIPE_SECRET_KEY || 'sk_test_dummy';
const stripe = require('stripe')(stripeKey);
const User = require('../models/User');

class PaymentService {
    async createCheckoutSession(userEmail, redirectUrl) {
        const successUrlBase = process.env.CLIENT_URL ||
            (process.env.NODE_ENV === 'production'
                ? 'https://assignment11-2-k4anmy2lj-reazul-islam02s-projects.vercel.app'
                : 'http://localhost:5173');

        return await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            line_items: [
                {
                    price_data: {
                        currency: 'bdt',
                        product_data: {
                            name: 'Lifetime Premium Access',
                            description: 'Unlock all premium lessons and features.',
                        },
                        unit_amount: 1500 * 100, // 1500 BDT
                    },
                    quantity: 1,
                },
            ],
            customer_email: userEmail,
            success_url: `${successUrlBase}/payment/success?redirect=${encodeURIComponent(redirectUrl || '/dashboard')}`,
            cancel_url: `${successUrlBase}/payment/cancel?redirect=${encodeURIComponent(redirectUrl || '/dashboard')}`,
        });
    }

    async setPremiumStatus(email) {
        return await User.findOneAndUpdate(
            { email },
            { isPremium: true },
            { new: true }
        );
    }
}

module.exports = new PaymentService();
