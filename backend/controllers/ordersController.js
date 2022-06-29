const Orders = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middlewares/asyncErrors');

// Fetch order data.
exports.newOrder = asyncErrors(async (req, res, next) => {
    const {
            orderItems,
            shippingInfo,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
            paymentInfo
        
        } = req.body;

    // Create order with fetched data.
    //const productRef = req.order.id;
    const order = new Orders({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id
    });

    try {
        console.log(order);
        await order.save();
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
})
