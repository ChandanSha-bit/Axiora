const User = require('../models/User');
const jwt = require('jsonwebtoken');

/**
 * @desc    Generate JWT Token
 */
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE,
  });
};

/**
 * @desc    Handle Google OAuth Callback
 * @route   GET /api/auth/google/callback
 * @access  Public (called by Google)
 */
exports.googleCallback = (req, res) => {
  // Passport attaches the authenticated user to req.user
  if (!req.user) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
  }

  // Generate JWT token
  const token = generateToken(req.user._id);

  // Redirect to frontend with token in URL
  // The frontend will extract the token and store it
  res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    subscriptionTier: req.user.subscriptionTier,
    energy: req.user.energy
  }))}`);
};

/**
 * @desc    Handle GitHub OAuth Callback
 * @route   GET /api/auth/github/callback
 * @access  Public (called by GitHub)
 */
exports.githubCallback = (req, res) => {
  if (!req.user) {
    return res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
  }

  const token = generateToken(req.user._id);

  res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}&user=${encodeURIComponent(JSON.stringify({
    _id: req.user._id,
    name: req.user.name,
    email: req.user.email,
    subscriptionTier: req.user.subscriptionTier,
    energy: req.user.energy
  }))}`);
};

/**
 * @desc    Handle OAuth Failure
 * @route   GET /api/auth/failure
 * @access  Public
 */
exports.oauthFailure = (req, res) => {
  res.redirect(`${process.env.FRONTEND_URL}/login?error=oauth_failed`);
};
