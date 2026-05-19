const Groq = require('groq-sdk'); // Import Groq SDK
const Chat = require('../models/Chat'); // Import the Chat database model
const User = require('../models/User'); // Import User to manage energy

// Initialize the Groq client with your API key from .env
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

/**
 * @desc    Send a message and get AI response
 * @route   POST /api/chat
 * @access  Private
 */
exports.sendMessage = async (req, res) => {
  try {
    const { message, chatId } = req.body;

    // req.user is already attached by authMiddleware — no extra DB call needed
    const user = req.user;
    // WHY ?? 100: Existing accounts created before the 'energy' field was added
    // will have energy = undefined. We default them to 100 to avoid NaN crashes.
    const currentEnergy = user.energy ?? 100;

    // 1. Energy gate (free tier only)
    if (user.subscriptionTier === 'free' && currentEnergy < 2) {
      return res.status(403).json({
        success: false,
        message: 'Neural energy depleted. Upgrade to Pro for unlimited synthesis.',
      });
    }

    // 2. Find or create chat
    let chat;
    if (chatId) {
      chat = await Chat.findById(chatId);
      if (!chat) {
        return res.status(404).json({ success: false, message: 'Chat session not found.' });
      }
    } else {
      chat = await Chat.create({ user: user._id, messages: [] });
    }

    // 3. Add user message + call Groq AI
    chat.messages.push({ role: 'user', content: message });

    const completion = await groq.chat.completions.create({
      messages: chat.messages.map(m => ({ role: m.role, content: m.content })),
      model: 'llama-3.3-70b-versatile',
    });

    const aiMessage = completion.choices[0]?.message?.content || '';
    chat.messages.push({ role: 'assistant', content: aiMessage });
    chat.lastActive = Date.now();
    await chat.save();

    // 4. Atomically deduct energy — $inc avoids NaN issues with undefined fields
    // WHY $inc and not user.save()? → If energy is undefined in DB, $inc sets it
    // correctly. user.save() would write NaN which breaks Mongoose validation.
    let newEnergy = currentEnergy;
    if (user.subscriptionTier === 'free') {
      const updated = await User.findByIdAndUpdate(
        user._id,
        { $inc: { energy: -2 } },
        { new: true, select: 'energy' }
      );
      newEnergy = updated?.energy ?? currentEnergy - 2;
    }

    res.status(200).json({ success: true, data: chat, energy: newEnergy });

  } catch (error) {
    console.error('❌ sendMessage error:', error.message);
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
    const chat = await Chat.findById(req.params.id);
    if (!chat || chat.user.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Chat not found' });
    }
    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete a conversation by ID
 * @route   DELETE /api/chat/:id
 * @access  Private
 */
exports.deleteChat = async (req, res) => {
  try {
    const chat = await Chat.findById(req.params.id);

    // Security: Make sure the chat exists AND belongs to this user
    // WHY? → Without this check, any logged-in user could delete anyone's chat
    if (!chat || chat.user.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Chat not found or access denied.' });
    }

    await Chat.findByIdAndDelete(req.params.id);

    res.status(200).json({ success: true, message: 'Conversation deleted.' });
  } catch (error) {
    console.error('❌ deleteChat error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Rename a conversation by ID
 * @route   PUT /api/chat/:id
 * @access  Private
 */
exports.renameChat = async (req, res) => {
  try {
    const { title } = req.body;
    if (!title || !title.trim()) {
      return res.status(400).json({ success: false, message: 'Title is required.' });
    }

    const chat = await Chat.findById(req.params.id);

    // Security: Make sure the chat exists AND belongs to this user
    if (!chat || chat.user.toString() !== req.user.id) {
      return res.status(404).json({ success: false, message: 'Chat not found or access denied.' });
    }

    chat.title = title.trim();
    await chat.save();

    res.status(200).json({ success: true, data: chat });
  } catch (error) {
    console.error('❌ renameChat error:', error.message);
    res.status(500).json({ success: false, message: error.message });
  }
};
