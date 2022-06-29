const express = require('express');
const router = express.Router();

// Import auth controllers.
const { 
    registerUser,
    loginUser,
    logoutUser,
    forgotPassword,
    resetPassword,
    getMe,
    updatePassword } = require('../controllers/authController');

const { isAuthenticated } = require('../middlewares/auth');

// Initialize auth routes.
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticated, getMe);
router.route('/password/update').put(isAuthenticated, updatePassword);

// Export auth routes.
module.exports = router;
