// Import router object of express.
const express = require('express');
const router = express.Router();

// Import controller functions.
const { getProducts,
        addProduct,
        getProduct,
        updateProduct,
        deleteProduct 
    } = require('../controllers/productsController');


// Require authentication for all routes.
const { isAuthenticated } = require('../middlewares/auth');

// Create route for `/products` endpoint.
router.route('/products').get(getProducts);

// Create route to get single product by ID.
router.route('/products/:id').get(getProduct);

// Create route to add new products.
router.route('/admin/products/new').post(isAuthenticated, addProduct);

// Update & delete product by ID.
router.route('/admin/products/:id').put(isAuthenticated, updateProduct)
                                   .delete(isAuthenticated, deleteProduct);

// Export router object of express.
module.exports = router;
