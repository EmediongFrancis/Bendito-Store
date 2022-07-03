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

// Initialize routes.
router.route('/order/new').post(isAuthenticated, newOrder);
router.route('/orders/me').get(isAuthenticated, myOrders);
router.route('/order/:id').get(isAuthenticated, getOrder);
router.route('/admin/orders').get(isAuthenticated, authorizeRoles('admin'), getAllOrders);
router.route('/admin/order/:id').put(isAuthenticated, authorizeRoles('admin'), updateOrder)
                                .delete(isAuthenticated, authorizeRoles('admin'), deleteOrder);

// Export router.
module.exports = router;
