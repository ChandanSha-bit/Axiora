const Groq = require('groq-sdk'); // Import Groq SDK
const Chat = require('../models/Chat'); // Import the Chat database model

// Initialize the Groq client with your API key from .env
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * @desc    Send a message and get AI response
 * @route   POST /api/chat
 * @access  Private
 */
exports.sendMessage = async (req, res) => {
  try {
    const { message, chatId } = req.body; // Extract data from request body
    let chat;

    // 1. Find existing chat or create a new one for this user
    if (chatId) {
      chat = await Chat.findById(chatId); // Look for the existing conversation
    } else {
      // Create a brand new conversation linked to the logged-in user
      chat = await Chat.create({ user: req.user.id, messages: [] });
    }

    // 2. Push the User's message into the conversation array
    chat.messages.push({ role: 'user', content: message });

    // 3. Request a response from the Groq AI model (Llama 3)
    const completion = await groq.chat.completions.create({
      // We map the messages to only include the 'role' and 'content' for the AI
      messages: chat.messages.map(m => ({ role: m.role, content: m.content })),
      model: "llama3-8b-8192", // Use the high-speed Llama 3 model
    });

    // 4. Extract the text response from the AI's complex reply object
    const aiMessage = completion.choices[0]?.message?.content || "";

    // 5. Push the AI's response into the conversation history
    chat.messages.push({ role: 'assistant', content: aiMessage });
    
    // 6. Update the last active timestamp and save the chat to MongoDB
    chat.lastActive = Date.now();
    await chat.save();

    // 7. Send the updated chat object back to the frontend
    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    // If anything fails, send a 500 error with the message
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all conversations for the logged in user
 * @route   GET /api/chat
 * @access  Private
 */
exports.getUserChats = async (req, res) => {
  try {
    // Find all chats where 'user' matches the logged-in user's ID
    // We sort by 'lastActive' so the newest chats appear at the top
    const chats = await Chat.find({ user: req.user.id }).sort({ lastActive: -1 });
    
    res.status(200).json({ success: true, count: chats.length, data: chats });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get a single conversation by ID
 * @route   GET /api/chat/:id
 * @access  Private
 */
exports.getChatById = async (req, res) => {
  try {
    // Find the specific chat by the ID passed in the URL
    const chat = await Chat.findById(req.params.id);

    // Security check: Ensure the chat actually belongs to the user requesting it
    if (!chat || chat.user.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }

    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
