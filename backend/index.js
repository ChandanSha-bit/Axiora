const express = require('express'); // Import the Express framework
const dotenv = require('dotenv');   // Import Dotenv for environment variables
const cors = require('cors');       // Import CORS to allow frontend communication
const rateLimit = require('express-rate-limit'); // Import the Rate Limiting library
const connectDB = require('./config/db'); // Import our custom database connection function

// 1. Load environment variables
dotenv.config();

// 2. Connect to the MongoDB Database
connectDB();

// 3. Initialize the Express application
const app = express();

// --- 4. SECURITY: RATE LIMITING ---
// This prevents bots and spammers from costing you money on AI/Images
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes window
  max: 100, // Limit each IP to 100 requests per window
  message: {
    success: false,
    message: 'Too many requests from this IP, please try again after 15 minutes',
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
});

// Apply the rate limiter to ALL requests
app.use(limiter);

// 5. Global Middlewares
app.use(cors());         // Enable CORS for all routes
app.use(express.json()); // Enable JSON body parsing for incoming requests

// 6. Define API Routes
app.use('/api/auth', require('./routes/authRoutes'));       // Authentication
app.use('/api/chat', require('./routes/chatRoutes'));       // AI Chat History
app.use('/api/user', require('./routes/userRoutes'));       // User Profile & Settings
app.use('/api/payments', require('./routes/paymentRoutes')); // Payments
app.use('/api/images', require('./routes/imageRoutes'));    // Image Generation

// 7. Base Health Check Route
app.get('/', (req, res) => {
  res.send('Atlas API is protected and running smoothly...');
});

// 8. Start the Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Atlas Server protected and running on port ${PORT}`);
});
