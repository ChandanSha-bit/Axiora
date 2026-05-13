const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');

// 1. Load Environment Variables
dotenv.config();

// 2. Connect to Database
connectDB();

const app = express();

// 3. Middlewares
app.use(cors());
app.use(express.json());

// 4. Routes
app.use('/api/auth', require('./routes/authRoutes'));

// Base Route
app.get('/', (req, res) => {
  res.send('Atlas API is running...');
});

// 5. Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Atlas Server running on port ${PORT}`);
});
