const express = require('express');
const router = express.Router();
const { updateDetails, updatePassword, deleteAccount } = require('../controllers/userController');
const { protect } = require('../middleware/authMiddleware');

// All profile routes must be PROTECTED
router.use(protect); // This applies 'protect' to every route below it!

router.put('/update-details', updateDetails);
router.put('/update-password', updatePassword);
router.delete('/delete-account', deleteAccount);

module.exports = router;
