const express = require('express');
const router = express.Router();
const { generateImage } = require('../controllers/imageController');
const { protect } = require('../middleware/authMiddleware');

/**
 * All Image routes are PROTECTED.
 * Generating images costs money (API credits), so we only allow logged-in users.
 */

router.post('/generate', protect, generateImage);

module.exports = router;
