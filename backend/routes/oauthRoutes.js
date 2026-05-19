const express = require('express');
const router = express.Router();
const passport = require('passport');
const { googleCallback, githubCallback, oauthFailure } = require('../controllers/oauthController');

/**
 * OAUTH AUTHENTICATION ROUTES
 * 
 * FLOW:
 * 1. Frontend redirects user to /api/auth/google or /api/auth/github
 * 2. Passport initiates the OAuth dance (redirects to provider)
 * 3. Provider redirects back to /callback
 * 4. Our controller handles the response and redirects to frontend with JWT
 */

// ========== GOOGLE OAUTH ==========

// Step 1: Initiate Google OAuth
router.get(
  '/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

// Step 2: Google calls this URL after user consents
router.get(
  '/google/callback',
  passport.authenticate('google', { 
    failureRedirect: '/api/auth/failure',
    session: false // We're using JWT, not sessions
  }),
  googleCallback
);

// ========== GITHUB OAUTH ==========

// Step 1: Initiate GitHub OAuth
router.get(
  '/github',
  passport.authenticate('github', { scope: ['user:email'] })
);

// Step 2: GitHub calls this URL after user consents
router.get(
  '/github/callback',
  passport.authenticate('github', { 
    failureRedirect: '/api/auth/failure',
    session: false
  }),
  githubCallback
);

// ========== OAUTH FAILURE ==========
router.get('/failure', oauthFailure);

module.exports = router;
