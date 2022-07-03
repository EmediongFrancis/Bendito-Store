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
    updatePassword,
    updateProfile,
    getAllUsers,
    getUserById,
    updateAdminProfile,
    deleteUser } = require('../controllers/authController');

const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

// Register user.
router.route('/register').post(registerUser);

// Login user.
router.route('/login').post(loginUser);

// Logout user.
router.route('/logout').get(logoutUser);

// Forgot password.
router.route('/password/forgot').post(forgotPassword);

// Reset password.
router.route('/password/reset/:token').put(resetPassword);

// Get logged in user profile.
router.route('/me').get(isAuthenticated, getMe);

// Update logged in user password.
router.route('/password/update').put(isAuthenticated, updatePassword);

// Update logged in user profile.
router.route('/me/update').put(isAuthenticated, updateProfile);

// Get all users.
router.route('/admin/users').get(isAuthenticated, authorizeRoles('admin'), getAllUsers);

// Get user by id.
router.route('/admin/users/:id').get(isAuthenticated, authorizeRoles('admin'), getUserById)

                                // Update user profile.
                                .put(isAuthenticated, authorizeRoles('admin'), updateAdminProfile)

                                // Delete user.
                                .delete(isAuthenticated, authorizeRoles('admin'), deleteUser);




// Export auth routes.
module.exports = router;
