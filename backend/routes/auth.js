const express = require('express');
const router = express.Router();

// Import auth controllers.
const { registerUser, loginUser, logoutUser, forgotPassword } = require('../controllers/authController');

// Initialize auth routes.
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);

// Export auth routes.
module.exports = router;
