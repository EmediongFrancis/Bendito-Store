const express = require('express');
const router = express.Router();

// Import controller functions.
const { getProducts,
        addProduct,
        getProduct,
        updateProduct,
        deleteProduct,
        addReview,
        getReviews,
        deleteReview
    } = require('../controllers/productsController');


// Require authentication and authorization for admin roles.
const { isAuthenticated, authorizeRoles } = require('../middlewares/auth');

// Create route to get all products.
router.route('/products').get(getProducts);

// Create route to get single product by ID.
router.route('/products/:id').get(getProduct);

// Create admin route to add new products.
router.route('/admin/products/new').post(isAuthenticated, authorizeRoles('admin'), addProduct);

// Create admin route to update & delete product by ID.
router.route('/admin/products/:id').put(isAuthenticated, authorizeRoles('admin'), updateProduct)
                                   .delete(isAuthenticated, authorizeRoles('admin'), deleteProduct);

// Create route to add new review for product.
router.route('/review').put(isAuthenticated, addReview);

// Create route to get all reviews for a product.
router.route('/reviews').get(getReviews);

// Create route to delete review for a product.
router.route('/reviews').delete(isAuthenticated, deleteReview);

// Export router.
module.exports = router;
