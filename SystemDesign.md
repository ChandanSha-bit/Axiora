# Atlas | System Architecture & Design

## 1. Overview
Atlas is a premium AI-driven platform designed for focus and creativity. This document outlines the technical architecture required to support the existing Next.js frontend with a robust, scalable backend.

## 2. Technology Stack
| Layer | Technology | Rationale |
| :--- | :--- | :--- |
| **Frontend** | Next.js 14 (App Router) | Modern SSR/ISR for performance and SEO. |
| **Backend** | Node.js + Express.js | Scalable, high-performance, and native JSON support. |
| **Database** | MongoDB (Atlas) | Flexible schema for nested chat history and user metadata. |
| **Authentication** | JWT + bcrypt | Secure, stateless authentication for API scalability. |
| **AI Integration** | OpenAI SDK | Industry-standard for Chat (GPT-4) and Image Gen (DALL-E 3). |
| **Payments** | Stripe | Gold standard for subscription-based SaaS billing. |

## 3. High-Level Architecture
- **Frontend**: Next.js App Router communicating via RESTful API.
- **Backend**: Express.js server hosted on Node.js.
- **Database**: MongoDB for unstructured data (Chat logs) and user profiles.
- **Security**: JWT-based auth with HttpOnly cookies for safety.

## 4. Database Schema (Draft)
### Users
- `id`, `email`, `passwordHash`, `name`, `bio`, `avatarUrl`
- `subscriptionTier`: ['free', 'pro', 'enterprise']
- `stripeCustomerId`

### Conversations
- `id`, `userId`, `title`, `lastActive`
- `messages`: [{ `role`: 'user'|'assistant', `content`: string, `timestamp`: date }]

---

# Atlas | Backend Implementation Roadmap

## Phase 1: Foundation (The Core)
1.  **Initialize Project**: Setup Express with TypeScript, ESLint, and Prettier.
2.  **Database Connection**: Configure Mongoose connection to MongoDB Atlas.
3.  **Error Handling**: Implement global error middleware and custom Atlas API response format.

## Phase 2: Authentication (Identity)
1.  **Registration/Login**: Secure endpoints with password hashing and JWT issuance.
2.  **Auth Middleware**: Protect private routes (Chat, Settings) with token verification.
3.  **Password Reset**: Integration with an email service (SendGrid/Nodemailer).

## Phase 4: The Intelligence (AI Features)
1.  **Chat API**: Stream responses from OpenAI GPT-4.
2.  **History Engine**: Save/Retrieve chat history from MongoDB.
3.  **Visual Studio**: Endpoint for generating and storing AI-generated images.

## Phase 5: User & Billing (SaaS)
1.  **Profile API**: Support for updating bio, name, and deleting accounts in Settings.
2.  **Stripe Integration**: Webhook support for subscription updates and checkout sessions.

## Phase 6: Deployment & Optimization
1.  **CORS/Security**: Configure Helmet and CORS for frontend-backend communication.
2.  **Vercel/Render**: Deploy API and connect environment variables.
