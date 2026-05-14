# Atlas | Backend System Design

This document outlines the internal architecture, data flow, and security model of the Atlas Backend Engine.

## 🛠️ 1. Core Architecture (MVC)
The backend follows the **Model-View-Controller** pattern to ensure modularity and scalability.

- **Models (`/models`)**: Defines the structure of MongoDB documents (Users, Chats).
- **Controllers (`/controllers`)**: Contains the business logic and handles the request/response cycle.
- **Routes (`/routes`)**: Maps endpoint URLs to specific controller functions.
- **Middleware (`/middleware`)**: Handles cross-cutting concerns like Authentication (JWT) and Security.
- **Config (`/config`)**: Manages external connections (Database).

---

## 🔐 2. Security & Identity
### Authentication Flow
1. **Password Hashing**: We use `bcryptjs` with 10 salt rounds to hash passwords before they ever touch the database.
2. **Identity Issuance**: Upon successful login, the server generates a **JWT (JSON Web Token)** signed with a `JWT_SECRET`.
3. **Identity Verification**: The `authMiddleware` intercepts requests to private routes, extracts the `Bearer` token, verifies it, and attaches the `user` object to the request.

### Security Headers
- **CORS**: Configured to allow only trusted frontend origins.
- **JSON Sanitization**: `express.json()` handles parsing to prevent common injection attacks.

---

## 🗄️ 3. Database Schema
### User Model
- `name`: (String)
- `email`: (String, Unique, Regex Validated)
- `password`: (String, Hashed, Hidden by default)
- `bio`: (String, Default: "I am using Atlas AI.")
- `subscriptionTier`: ('free', 'pro', 'enterprise')

### Chat Model
- `user`: (Reference -> User ID)
- `messages`: (Array of Objects: {role, content, timestamp})
- `lastActive`: (Date)

---

## 🚀 4. API Endpoint Map

### Auth & User
- `POST /api/auth/register`: Create a new account.
- `POST /api/auth/login`: Authenticate and receive JWT.
- `GET /api/auth/me`: Fetch current user profile (Protected).
- `PUT /api/user/update-details`: Change name/email/bio (Protected).
- `PUT /api/user/update-password`: Secure password change (Protected).

### AI Intelligence
- `POST /api/chat`: Send message to Groq (Llama 3) and save history.
- `GET /api/chat`: List all user conversations.
- `GET /api/chat/:id`: Fetch specific chat messages.
- `POST /api/images/generate`: Generate AI images via DALL-E 3.

### Financials (Primary: Razorpay)
- `POST /api/payments/stripe/create-session`: International payments (Stripe).
- `POST /api/payments/razorpay/create-order`: India/Global orders (Razorpay).
- `POST /api/payments/razorpay/verify`: Secure payment signature check.
- `POST /api/payments/razorpay/webhook`: Background payment fulfillment.

---

## ☁️ 5. Third-Party Integrations
- **Groq**: LPU-powered inference for high-speed LLM responses.
- **OpenAI**: Used for DALL-E 3 image generation.
- **Stripe**: Global payment processing.
- **Razorpay**: Specialized payment gateway for India.
- **MongoDB Atlas**: Cloud-hosted NoSQL database.
