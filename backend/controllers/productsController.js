const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middlewares/asyncErrors');
const APIFeatures = require('../utils/apiFeatures');

// Create new product using product model.
exports.addProduct = asyncErrors (async (req, res, next) => {

    // Fetch user from request object.
   const user =  req.user.id;
   const newProducts = req.body.map( product => ({...product, user}))
   const product = await Product.create(newProducts);

    res.status(201).json({
        success: true,
        product
    });
})

// Get all products.
exports.getProducts = asyncErrors (async (req, res, next) => {

    // Declare max limit of products.
    const resultsPerPage = 6;
    const productCount = await Product.countDocuments();

    // Implement API features; search, pagination, and filtering.
    const apiFeatures = new APIFeatures(Product.find(), req.query)
                                        .search()
                                        .filter()
                                        .paginate(resultsPerPage);
    
    // Fetch products from newly implemented API features.
    const products = await apiFeatures.query;
    
    res.status(200).json({
        success: true,
        count: products.length,
        productCount,
        products
    });
})

// Get single product by ID.
exports.getProduct = asyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.params.id);

    if (!product) {

        // Use custom error handler to handle errors.
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

// Create new review for product.
exports.addReview = asyncErrors (async (req, res, next) => {
    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user.id,
        name: req.user.name,
        rating: Number(rating),
        comment
    }

    // Find product by ID.
    const product = await Product.findById(productId);

    const boolReview = product.reviews.find(
        review => review.user.toString() === req.user.id.toString()
    )

    if (boolReview) {
        product.reviews.forEach(review => {
            if (review.user.toString() === req.user.id.toString()) {
                review.rating = rating;
                review.comment = comment;
            }
        })
    } else {
        product.reviews.push(review);
        product.totalReviews = product.reviews.length;
    }

    product.ratings = product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.
    reviews.length ;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true,
        message: 'Review added.'

    })
})

// Get all reviews for a product.
exports.getReviews = asyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler('Product not found.', 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    })
})

// Delete review for a product.
exports.deleteReview = asyncErrors (async (req, res, next) => {
    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler('Product not found.', 404));
    }

    const reviews = product.reviews.filter(review => review._id.toString() !== req.query.id.
    toString());

    const totalReviews = reviews.length;

    const ratings = product.reviews.reduce((acc, review) => review.rating + acc, 0) / product.
    reviews.length ;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings,
        totalReviews
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    })

    res.status(200).json({
        success: true,
        message: 'Review deleted.'
    })
})