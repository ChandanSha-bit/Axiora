const express = require('express');
const router = express.Router();
const { registerUser, loginUser, getMe, forgotPassword } = require('../controllers/authController');
const { protect } = require('../middleware/authMiddleware');

/**
 * AUTHENTICATION ROUTES
 * Handles user identity, login, and password recovery
 */

// Public Routes (Anyone can access)
router.post('/register', registerUser);
router.post('/login', loginUser);
router.post('/forgot-password', forgotPassword); // Sends the reset email

// Private Routes (Only logged-in users with a JWT token)
router.get('/me', protect, getMe); // Returns current user data

module.exports = router;
