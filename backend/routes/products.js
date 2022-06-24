// Import router object of express.
const express = require('express');
const router = express.Router();

// Import `getProducts` function from `productsController.js`.
const { getProducts } = require('../controllers/productsController');

// Create route for `/products` endpoint.
router.route('/products').get(getProducts);

// Export router object of express.
module.exports = router;
