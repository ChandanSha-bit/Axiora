const nodemailer = require('nodemailer');

/**
 * @desc    Send Email Utility
 * @logic   Creates a transporter and sends an HTML email
 */
const sendEmail = async (options) => {
  // 1. Create a transporter (The 'Post Office' configuration)
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  // 2. Define the email options
  const message = {
    from: `${process.env.FROM_NAME} <${process.env.FROM_EMAIL}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html, // Support for beautiful HTML emails
  };

  // 3. Actually send the email
  const info = await transporter.sendMail(message);

  console.log('✅ Email sent: %s', info.messageId);
};

module.exports = sendEmail;
