const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const GitHubStrategy = require('passport-github2').Strategy;
const User = require('../models/User');

/**
 * Passport Configuration for OAuth Strategies
 * 
 * HOW IT WORKS:
 * 1. User clicks "Login with Google/GitHub" on frontend
 * 2. Frontend redirects to /api/auth/google or /api/auth/github
 * 3. Passport redirects user to Google/GitHub consent screen
 * 4. User approves, Google/GitHub redirects back with an auth code
 * 5. Passport exchanges code for user profile
 * 6. We find or create the user in our database
 * 7. Passport attaches user to req.user
 * 8. Our callback handler generates JWT and redirects to frontend
 */

// Serialize user for the session (stores user ID in session)
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// Deserialize user from session (fetches full user from DB)
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error, null);
  }
});

// ========== GOOGLE STRATEGY ==========
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/google/callback`,
      proxy: true, // Trust proxy headers (helps with redirect URI issues)
      scope: ['profile', 'email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Extract email from Google profile
        const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        
        if (!email) {
          return done(new Error('No email found in Google profile'), null);
        }

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
          // User exists, return them
          return done(null, user);
        }

        // Create new user from Google profile
        user = await User.create({
          name: profile.displayName || 'Atlas User',
          email: email,
          password: Math.random().toString(36).slice(-16) + Math.random().toString(36).slice(-8), // Random password (user won't need it)
          avatarUrl: profile.photos && profile.photos[0] ? profile.photos[0].value : '',
          bio: 'Joined Atlas via Google',
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

// ========== GITHUB STRATEGY ==========
passport.use(
  new GitHubStrategy(
    {
      clientID: process.env.GITHUB_CLIENT_ID,
      clientSecret: process.env.GITHUB_CLIENT_SECRET,
      callbackURL: `${process.env.BACKEND_URL || 'http://localhost:5000'}/api/auth/github/callback`,
      scope: ['user:email'],
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // GitHub doesn't always return email in profile, we may need to fetch it
        let email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;
        
        // If no email in profile, use the username-based email
        if (!email) {
          email = `${profile.username}@github.atlas.ai`;
        }

        // Check if user already exists
        let user = await User.findOne({ email });

        if (user) {
          // User exists, return them
          return done(null, user);
        }

        // Create new user from GitHub profile
        user = await User.create({
          name: profile.displayName || profile.username || 'Atlas User',
          email: email,
          password: Math.random().toString(36).slice(-16) + Math.random().toString(36).slice(-8), // Random password
          avatarUrl: profile.photos && profile.photos[0] ? profile.photos[0].value : '',
          bio: 'Joined Atlas via GitHub',
        });

        done(null, user);
      } catch (error) {
        done(error, null);
      }
    }
  )
);

module.exports = passport;
