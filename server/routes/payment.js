const express = require('express');
const router = express.Router();
const paymentController = require('../controllers/paymentController');
const verifyToken = require('../middlewares/verifyToken');

router.post('/create-checkout-session', verifyToken, paymentController.createCheckoutSession);
router.post('/payment-success', verifyToken, paymentController.handlePaymentSuccess);

module.exports = router;
