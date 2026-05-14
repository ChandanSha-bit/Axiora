const User = require('../models/User');
const Chat = require('../models/Chat');

/**
 * @desc    Update user profile details (Name, Bio, Email)
 * @route   PUT /api/user/update-details
 * @access  Private
 */
exports.updateDetails = async (req, res) => {
  try {
    const fieldsToUpdate = {
      name: req.body.name,
      email: req.body.email,
      bio: req.body.bio,
    };

    // Update the user document in the database
    const user = await User.findByIdAndUpdate(req.user.id, fieldsToUpdate, {
      new: true, // Return the updated document
      runValidators: true, // Ensure the new data follows the schema rules
    });

    res.status(200).json({ success: true, data: user });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Update user password
 * @route   PUT /api/user/update-password
 * @access  Private
 */
exports.updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    // 1. Get user from DB and include the password field
    const user = await User.findById(req.user.id).select('+password');

    // 2. Check if current password matches
    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ success: false, message: 'Current password is incorrect' });
    }

    // 3. Set new password and save (The 'pre-save' hook will hash it!)
    user.password = newPassword;
    await user.save();

    res.status(200).json({ success: true, message: 'Password updated successfully' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete user account and all their chats (Clean Wipe)
 * @route   DELETE /api/user/delete-account
 * @access  Private
 */
exports.deleteAccount = async (req, res) => {
  try {
    // 1. Delete all chats belonging to this user
    await Chat.deleteMany({ user: req.user.id });

    // 2. Delete the user document
    await User.findByIdAndDelete(req.user.id);

    res.status(200).json({ success: true, message: 'Account and all data deleted' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
