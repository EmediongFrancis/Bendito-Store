// Import router object of express.
const express = require('express');
const router = express.Router();

// Import `getProducts` and `newProduct` function from `productsController.js`.
const { getProducts, addProduct, getProduct } = require('../controllers/productsController');

// Create route for `/products` endpoint.
router.route('/products').get(getProducts);

// Create route to add new products.
router.route('/products/new').post(addProduct);

// Create route to get single product by ID.
router.route('/products/:id').get(getProduct);

// Export router object of express.
module.exports = router;
