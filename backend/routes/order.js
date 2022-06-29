const express = require('express');
const router = express.Router();

// Import order controllers.
const { newOrder } = require('../controllers/ordersController');

// Import auth middlewares.
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

// Initialize routes.
router.route('/order/new').post(isAuthenticated, newOrder);

// Export router.
module.exports = router;
