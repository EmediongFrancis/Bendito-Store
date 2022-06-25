const Product = require('../models/product');
const ObjectId = require('mongodb').ObjectId;

// Create new product using product model.
exports.addProduct = async (req, res, next) => {
    const product = await Product.create(req.body);
    res.status(201).json({
        success: true,
        product
    });
}

// Get all products.
exports.getProducts = async (req, res, next) => {

    const products = await Product.find();
    
    res.status(200).json({
        success: true,
        count: products.length,
        products
    });
}

// Get single product by ID.
exports.getProduct = async (req, res, next) => {
    const product = await Product.findById(ObjectId(req.params.id));

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found.'
        });
    }

    res.status(200).json({
        success: true,
        product
    })
}

// Update product by ID.
exports.updateProduct = async (req, res, next) => {

    let product = await Product.findByIdAndUpdate(ObjectId(req.params.id));

    if (!product) {
        return res.status(404).json({
            success: false,
            message: 'Product not found.'
        });
    }

    product = await Product.findByIdAndUpdate(ObjectId(req.params.id), req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        product
    })
}
