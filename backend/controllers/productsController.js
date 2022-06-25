const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middlewares/asyncErrors');

// Create new product using product model.
exports.addProduct = asyncErrors (async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
})

// Get all products.
exports.getProducts = asyncErrors (async (req, res, next) => {

    const products = await Product.find();
    
    res.status(200).json({
        success: true,
        count: products.length,
        products
    });
})

// Get single product by ID.
exports.getProduct = asyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found.', 404));
    }

    res.status(200).json({
        success: true,
        product
    })
})

// Update product by ID.
exports.updateProduct = asyncErrors (async (req, res, next) => {

    let product = await Product.findByIdAndUpdate(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found.', 404));
    }

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
})

// Delete product by ID.
exports.deleteProduct = asyncErrors (async (req, res, next) => {
    let product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
        return next(new ErrorHandler('Product not found.', 404));
    }

    product = await Product.findByIdAndDelete(req.params.id);

    res.status(200).json({
        success: true,
        message: 'Product deleted.'
    })
})