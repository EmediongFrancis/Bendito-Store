const express = require('express');
const router = express.Router();

// Import order controllers.
const { newOrder,
        myOrders,
        getOrder,
        getAllOrders,
        updateOrder,
        deleteOrder
     } = require('../controllers/ordersController');

// Import auth middlewares.
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

// Add new order.
router.route('/order/new').post(isAuthenticated, newOrder);

// Get all orders of logged in user.
router.route('/orders/me').get(isAuthenticated, myOrders);

// Get order by id.
router.route('/order/:id').get(isAuthenticated, getOrder);

// Get all orders.
router.route('/admin/orders').get(isAuthenticated, authorizeRoles('admin'), getAllOrders);

// Update order.
router.route('/admin/order/:id').put(isAuthenticated, authorizeRoles('admin'), updateOrder)
                                 
                                // Delete order.
                                .delete(isAuthenticated, authorizeRoles('admin'), deleteOrder);

// Export router.
module.exports = router;
