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

// Initialize auth routes.
router.route('/register').post(registerUser);
router.route('/login').post(loginUser);
router.route('/logout').get(logoutUser);
router.route('/password/forgot').post(forgotPassword);
router.route('/password/reset/:token').put(resetPassword);
router.route('/me').get(isAuthenticated, getMe);
router.route('/password/update').put(isAuthenticated, updatePassword);
router.route('/me/update').put(isAuthenticated, updateProfile);
router.route('/admin/users').get(isAuthenticated, authorizeRoles('admin'), getAllUsers);
router.route('/admin/users/:id').get(isAuthenticated, authorizeRoles('admin'), getUserById)
                                .put(isAuthenticated, authorizeRoles('admin'), updateAdminProfile)
                                .delete(isAuthenticated, authorizeRoles('admin'), deleteUser);




// Export auth routes.
module.exports = router;
