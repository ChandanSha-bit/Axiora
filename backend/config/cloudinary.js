const cloudinary = require('cloudinary').v2;

/**
 * @desc  Initialize Cloudinary Configuration
 * @logic Connects to your Cloudinary account using environment variables
 */
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

module.exports = cloudinary;
