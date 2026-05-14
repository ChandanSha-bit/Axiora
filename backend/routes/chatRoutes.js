const express = require('express');
const router = express.Router();
const { sendMessage, getUserChats, getChatById } = require('../controllers/chatController');
const { protect } = require('../middleware/authMiddleware'); // Import our security guard

/**
 * All routes in this file are PROTECTED.
 * This means a user MUST have a valid JWT token to access them.
 */

// Route to get all chats (GET) and send a new message (POST)
router.route('/')
  .get(protect, getUserChats)   // GET /api/chat -> Gets the list of all conversations
  .post(protect, sendMessage);  // POST /api/chat -> Starts a new chat or continues an old one

// Route to get a specific chat by its unique ID
router.route('/:id')
  .get(protect, getChatById);    // GET /api/chat/12345 -> Gets all messages for one conversation

module.exports = router;
