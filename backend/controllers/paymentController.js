const Razorpay = require('razorpay'); // Import Razorpay library
const crypto = require('crypto'); // Built-in Node library for security (used to verify payments)
const User = require('../models/User'); // Import User model to upgrade tiers

// Initialize the Razorpay instance with your credentials
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

/**
 * @desc    Create a Razorpay Order (Generates a token for the frontend popup)
 * @route   POST /api/payments/razorpay/create-order
 * @access  Private
 */
exports.createRazorpayOrder = async (req, res) => {
  try {
    const { amount, planId } = req.body; // amount: in paise (e.g., 50000 = 500 INR)

    const options = {
      amount: amount, // The price
      currency: 'INR', // Use Indian Rupees
      receipt: `receipt_${Date.now()}`, // Unique receipt number for your records
      notes: {
        userId: req.user.id, // Record who is paying
        planId: planId, // Record which plan they want
      },
    };

    // 1. Tell Razorpay to generate a new Order ID
    const order = await razorpay.orders.create(options);

    // 2. Send the Order data to the frontend so it can show the payment popup
    res.status(200).json({ success: true, data: order });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Verify Razorpay Payment Signature (Security check before upgrading)
 * @route   POST /api/payments/razorpay/verify
 * @access  Private
 */
exports.verifyRazorpayPayment = async (req, res) => {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature, planId } = req.body;

    // 1. Create a "Test Signature" to compare with what Razorpay sent us
    const body = razorpay_order_id + "|" + razorpay_payment_id;
    const expectedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(body.toString())
      .digest("hex");

    // 2. If signatures match, the payment is 100% REAL
    if (expectedSignature === razorpay_signature) {
      
      // 3. Upgrade the user's account in the database!
      await User.findByIdAndUpdate(req.user.id, {
        subscriptionTier: planId,
        paymentStatus: 'active'
      });

      res.status(200).json({ success: true, message: 'Payment verified and account upgraded' });
    } else {
      res.status(400).json({ success: false, message: 'Invalid signature. Security alert!' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Razorpay Webhook (Handles background payment success signals)
 * @route   POST /api/payments/razorpay/webhook
 * @access  Private (Secret verification)
 */
exports.razorpayWebhook = async (req, res) => {
  try {
    const secret = process.env.RAZORPAY_WEBHOOK_SECRET;

    // Verify the webhook signature sent by Razorpay
    const shasum = crypto.createHmac('sha256', secret);
    shasum.update(JSON.stringify(req.body));
    const digest = shasum.digest('hex');

    if (digest === req.headers['x-razorpay-signature']) {
      // 1. Payment is legitimate!
      const event = req.body.event;
      
      if (event === 'payment.captured') {
        const { userId, planId } = req.body.payload.payment.entity.notes;

        // 2. Upgrade the user profile in the background
        await User.findByIdAndUpdate(userId, {
          subscriptionTier: planId,
          paymentStatus: 'active'
        });
      }

      res.status(200).json({ status: 'ok' });
    } else {
      res.status(400).json({ status: 'invalid signature' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
