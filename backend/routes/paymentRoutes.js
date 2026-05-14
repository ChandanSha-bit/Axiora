const express = require('express');
const router = express.Router();
const { createRazorpayOrder, verifyRazorpayPayment, razorpayWebhook } = require('../controllers/paymentController');
const { protect } = require('../middleware/authMiddleware');

/**
 * RAZORPAY PAYMENT ROUTES
 * Optimized for the Indian & Global market using Razorpay.
 */

// Route to create a new order
router.post('/razorpay/create-order', protect, createRazorpayOrder);

// Route to verify a successful payment signature
router.post('/razorpay/verify', protect, verifyRazorpayPayment);

// Webhook for background payment fulfillment
router.post('/razorpay/webhook', razorpayWebhook);

module.exports = router;
