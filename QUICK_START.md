# Atlas Quick Start Guide

Get Atlas up and running in 5 minutes.

---

## 📦 Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account (or local MongoDB)
- Git

---

## 🚀 Installation

### 1. Clone & Install Dependencies

```bash
# Backend
cd backend
npm install

# Frontend (in a new terminal)
cd frontend
npm install
```

---

## ⚙️ Configuration

### Backend Environment Variables

Create `backend/.env` (already exists, verify these values):

```env
# Server
PORT=5000
FRONTEND_URL=http://localhost:3000

# Database
MONGO_URI=your_mongodb_connection_string

# JWT
JWT_SECRET=your_secret_key_here
JWT_EXPIRE=30d

# AI Services
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key

# Cloudinary (for image storage)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Email (for password reset)
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=2525
EMAIL_USER=your_mailtrap_user
EMAIL_PASS=your_mailtrap_pass
FROM_NAME=Atlas AI
FROM_EMAIL=noreply@atlas.ai

# OAuth (optional - see OAUTH_SETUP.md)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret

# Payments (optional)
RAZORPAY_KEY_ID=your_razorpay_key
RAZORPAY_KEY_SECRET=your_razorpay_secret
```

### Frontend Environment Variables

Create `frontend/.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

---

## 🏃 Running the Application

### Start Backend (Terminal 1)

```bash
cd backend
npm run dev
```

You should see:
```
🚀 Atlas Server protected and running on port 5000
```

### Start Frontend (Terminal 2)

```bash
cd frontend
npm run dev
```

You should see:
```
▲ Next.js 16.2.6
- Local:        http://localhost:3000
```

---

## 🧪 Testing Features

### 1. Basic Authentication
1. Open http://localhost:3000
2. Click "Begin Synthesis" or "Portal"
3. Register a new account
4. You'll be redirected to `/chat`

### 2. AI Chat
1. After logging in, you're on the chat page
2. Type a message and press Enter
3. Groq (Llama 3) will respond
4. Your chat history is saved automatically

### 3. Password Reset
1. Go to http://localhost:3000/login
2. Click "Forgot Key?"
3. Enter your email
4. Check your email inbox (Mailtrap if configured)
5. Click the reset link
6. Enter new password
7. You'll be logged in automatically

### 4. OAuth (if configured)
1. Go to http://localhost:3000/login
2. Click "Google" or "GitHub"
3. Authorize the app
4. You'll be redirected back and logged in

---

## 🔍 Troubleshooting

### Backend won't start
- Check if MongoDB connection string is correct
- Verify all required environment variables are set
- Check if port 5000 is already in use

### Frontend won't start
- Check if `NEXT_PUBLIC_API_URL` is set correctly
- Verify Node.js version (18+)
- Try deleting `node_modules` and reinstalling

### OAuth not working
- Make sure OAuth credentials are in `.env`
- Check callback URLs match exactly
- See `backend/OAUTH_SETUP.md` for detailed setup

### Password reset email not sending
- Verify email credentials in `.env`
- Check Mailtrap inbox (if using Mailtrap)
- Check backend console for errors

### Chat not working
- Verify `GROQ_API_KEY` is valid
- Check backend console for API errors
- Make sure you're logged in (JWT token exists)

---

## 📚 API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user (protected)
- `POST /api/auth/forgot-password` - Request password reset
- `PUT /api/auth/reset-password/:token` - Reset password
- `GET /api/auth/google` - Initiate Google OAuth
- `GET /api/auth/github` - Initiate GitHub OAuth

### Chat
- `POST /api/chat` - Send message to AI
- `GET /api/chat` - Get all user chats
- `GET /api/chat/:id` - Get specific chat

### Images
- `POST /api/images/generate` - Generate AI image

### Payments
- `POST /api/payments/razorpay/create-order` - Create payment order
- `POST /api/payments/razorpay/verify` - Verify payment

---

## 🎯 What's Working

✅ User registration & login
✅ JWT authentication
✅ AI chat with Groq (Llama 3)
✅ Chat history persistence
✅ Password reset flow
✅ OAuth (Google & GitHub) - needs credentials
✅ Image generation (DALL-E 3) - backend only
✅ Energy system for free tier
✅ Rate limiting

---

## 🚧 What's Not Yet Implemented

❌ Settings page functionality
❌ Payment checkout UI
❌ Image generation UI
❌ File attachments
❌ Email verification
❌ Stripe integration

See `IMPLEMENTATION_STATUS.md` for detailed status.

---

## 📖 Documentation

- `OAUTH_SETUP.md` - OAuth configuration guide
- `IMPLEMENTATION_STATUS.md` - Feature completion status
- `backend/README.md` - Backend API documentation
- `backend/SystemDesign.md` - System architecture

---

## 🆘 Need Help?

1. Check the troubleshooting section above
2. Review the documentation files
3. Check backend console for errors
4. Check browser console for frontend errors
5. Verify all environment variables are set correctly

---

## 🎉 You're Ready!

Your Atlas instance should now be running. Start chatting with AI, test the features, and explore the codebase!
