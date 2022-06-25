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

// Create route for `/products` endpoint.
router.route('/products').get(getProducts);

// Create route to add new products.
router.route('/admin/products/new').post(addProduct);

// Create route to get single product by ID.
router.route('/products/:id').get(getProduct);

// Update product by ID.
router.route('/admin/products/:id').put(updateProduct);

// Delete product by ID.
router.route('/admin/products/:id').delete(deleteProduct);

// Export router object of express.
module.exports = router;
