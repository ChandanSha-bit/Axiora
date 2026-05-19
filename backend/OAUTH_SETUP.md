# OAuth Setup Guide for Atlas

This guide will help you configure Google and GitHub OAuth authentication for Atlas.

---

## 🔐 Google OAuth Setup

### Step 1: Create Google Cloud Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Google+ API** (or **Google Identity Services**)

### Step 2: Create OAuth Credentials
1. Navigate to **APIs & Services** → **Credentials**
2. Click **Create Credentials** → **OAuth client ID**
3. Choose **Web application**
4. Configure:
   - **Name**: Atlas OAuth
   - **Authorized JavaScript origins**: 
     - `http://localhost:5000` (development)
     - `https://your-production-domain.com` (production)
   - **Authorized redirect URIs**:
     - `http://localhost:5000/api/auth/google/callback` (development)
     - `https://your-production-domain.com/api/auth/google/callback` (production)

### Step 3: Add Credentials to .env
```env
GOOGLE_CLIENT_ID=your_google_client_id_here.apps.googleusercontent.com
GOOGLE_CLIENT_SECRET=your_google_client_secret_here
```

---

## 🐙 GitHub OAuth Setup

### Step 1: Register OAuth App
1. Go to [GitHub Developer Settings](https://github.com/settings/developers)
2. Click **New OAuth App**
3. Configure:
   - **Application name**: Atlas
   - **Homepage URL**: `http://localhost:3000` (or your production URL)
   - **Authorization callback URL**: 
     - `http://localhost:5000/api/auth/github/callback` (development)
     - `https://your-production-domain.com/api/auth/github/callback` (production)

### Step 2: Generate Client Secret
1. After creating the app, click **Generate a new client secret**
2. Copy both the **Client ID** and **Client Secret**

### Step 3: Add Credentials to .env
```env
GITHUB_CLIENT_ID=your_github_client_id_here
GITHUB_CLIENT_SECRET=your_github_client_secret_here
```

---

## 🧪 Testing OAuth Locally

### Backend (Terminal 1)
```bash
cd backend
npm run dev
```

### Frontend (Terminal 2)
```bash
cd frontend
npm run dev
```

### Test Flow
1. Open `http://localhost:3000/login`
2. Click **Google** or **GitHub** button
3. You'll be redirected to the provider's consent screen
4. After approval, you'll be redirected back to `/auth/callback`
5. The app will extract the JWT token and redirect you to `/chat`

---

## 🔍 Troubleshooting

### "Redirect URI mismatch" Error
- Make sure the callback URL in your OAuth app settings **exactly matches** the one in your code
- Check for trailing slashes (they matter!)
- Ensure you're using the correct protocol (http vs https)

### "Invalid Client" Error
- Double-check your Client ID and Client Secret in `.env`
- Make sure there are no extra spaces or quotes
- Restart your backend server after changing `.env`

### User Email Not Found
- For Google: Make sure you requested the `email` scope
- For GitHub: Some users hide their email. The code handles this by creating a fallback email

### Session/Cookie Issues
- We're using JWT tokens, not sessions
- Make sure `session: false` is set in passport.authenticate()

---

## 🚀 Production Deployment

### Environment Variables
Make sure to set these on your hosting platform (Vercel, Render, etc.):
- `GOOGLE_CLIENT_ID`
- `GOOGLE_CLIENT_SECRET`
- `GITHUB_CLIENT_ID`
- `GITHUB_CLIENT_SECRET`
- `FRONTEND_URL` (your production frontend URL)

### Update OAuth App Settings
1. Add your production URLs to authorized origins/redirects
2. Keep localhost URLs for development

---

## 📝 How It Works

```
┌─────────┐      ┌──────────┐      ┌──────────┐      ┌─────────┐
│ User    │─────▶│ Frontend │─────▶│ Backend  │─────▶│ Google/ │
│ Clicks  │      │ Redirects│      │ Initiates│      │ GitHub  │
│ OAuth   │      │          │      │ OAuth    │      │         │
└─────────┘      └──────────┘      └──────────┘      └─────────┘
                                                            │
                                                            ▼
┌─────────┐      ┌──────────┐      ┌──────────┐      ┌─────────┐
│ User    │◀─────│ Frontend │◀─────│ Backend  │◀─────│ Provider│
│ Logged  │      │ Stores   │      │ Generates│      │ Returns │
│ In      │      │ JWT      │      │ JWT      │      │ Profile │
└─────────┘      └──────────┘      └──────────┘      └─────────┘
```

---

## 🎯 Next Steps

After OAuth is working:
1. Test with multiple accounts
2. Add profile picture sync from OAuth providers
3. Implement account linking (connect Google + GitHub to same account)
4. Add OAuth provider info to user profile

---

## 📚 Resources

- [Google OAuth Documentation](https://developers.google.com/identity/protocols/oauth2)
- [GitHub OAuth Documentation](https://docs.github.com/en/developers/apps/building-oauth-apps)
- [Passport.js Documentation](http://www.passportjs.org/docs/)
