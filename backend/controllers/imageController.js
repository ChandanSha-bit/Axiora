const OpenAI = require('openai');
const cloudinary = require('../config/cloudinary'); // Import our new storage config

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * @desc    Generate a high-resolution image and save it PERMANENTLY
 * @route   POST /api/images/generate
 * @access  Private
 */
exports.generateImage = async (req, res) => {
  try {
    const { prompt, size = '1024x1024', quality = 'standard' } = req.body;

    if (!prompt) {
      return res.status(400).json({ success: false, message: 'Please provide a prompt' });
    }

    // 1. Generate Image using DALL-E 3
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: size,
      quality: quality,
    });

    const tempImageUrl = response.data[0].url; // This URL expires in 1 hour!

    // 2. Upload the image to Cloudinary (Permanently)
    // We tell Cloudinary to upload the image directly from the OpenAI URL
    const uploadResponse = await cloudinary.uploader.upload(tempImageUrl, {
      folder: 'atlas_ai_generations', // Organize images into a folder
      resource_type: 'image',
    });

    // 3. Send back the PERMANENT Cloudinary URL
    res.status(200).json({
      success: true,
      data: uploadResponse.secure_url, // This link lasts forever!
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
