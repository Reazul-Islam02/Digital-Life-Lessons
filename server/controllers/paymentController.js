const asyncHandler = require('express-async-handler');
const paymentService = require('../services/paymentService');
const AppError = require('../utils/appError');

const createCheckoutSession = asyncHandler(async (req, res) => {
    const { redirectUrl } = req.body;
    const session = await paymentService.createCheckoutSession(req.user.email, redirectUrl);
    res.status(200).json({
        status: 'success',
        data: { url: session.url }
    });
});

const handlePaymentSuccess = asyncHandler(async (req, res) => {
    const updatedUser = await paymentService.setPremiumStatus(req.user.email);
    if (!updatedUser) throw new AppError('User not found', 404);

    res.status(200).json({
        status: 'success',
        data: { user: updatedUser }
    });
});

module.exports = {
    createCheckoutSession,
    handlePaymentSuccess
};
