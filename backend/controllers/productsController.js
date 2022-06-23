const Product = require('../models/product');

// Create new product using product model.

exports.getProducts = (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Products fetched successfully.'
    });
}
