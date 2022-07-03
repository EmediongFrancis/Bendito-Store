const Orders = require('../models/order');
const Product = require('../models/product');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middlewares/asyncErrors');

// Create order.
exports.newOrder = asyncErrors(async (req, res, next) => {

    // Fetch order data.
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
    const order = new Orders({
        orderItems,
        shippingInfo,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
        paymentInfo,
        paidAt: Date.now(),
        user: req.user._id,
        productRef: req.product._id
    });

    try {
        console.log(order);
        await order.save({ validateBeforeSave: false });
        res.status(201).json({
            success: true,
            message: 'Order created successfully',
            order
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
})

// Get orders of logged in user.
exports.myOrders = asyncErrors(async (req, res, next) => {
    const orders = await Orders.find({ user: req.user._id });
    if (!orders) {
        next(new ErrorHandler('You have no orders', 404));
    }
    res.status(200).json({
        success: true,
        orders
    });
})

// Get order by id.
exports.getOrder = asyncErrors(async (req, res, next) => {
    const order = await Orders.findById(req.params.id);
    if (!order) {
        next(new ErrorHandler('Order not found', 404));
    }
    res.status(200).json({
        success: true,
        order
    });
})

// Get all orders.
exports.getAllOrders = asyncErrors(async (req, res, next) => {
    const orders = await Orders.find();

    let ordersCount = 0;
    orders.forEach(order => {
        ordersCount += order.totalPrice;

    })

    if (!orders) {
        next(new ErrorHandler('There are no orders', 404));
    }
    res.status(200).json({
        success: true,
        ordersCount,
        orders
    });
})

// Update order as admin.
exports.updateOrder = asyncErrors(async (req, res, next) => {
    const order = await Orders.findById(req.params.id);
    
    if (order.orderStatus === 'Delivered') {
        next(new ErrorHandler('Order is already delivered', 400));
    }

    order.orderItems.forEach(async item => {
        await updateStock(item.product, item.quantity);
    })

    order.orderStatus = req.body.status,
    order.deliveredAt = Date.now();

    await order.save();

    res.status(200).json({
        success: true,
        message: 'Order updated successfully'
    })
})

// Update stock of product.
async function updateStock(id, quantity) {
    const product = await Product.findById(id);
    product.stock -= quantity;
    await product.save();
}

// Delete order.
exports.deleteOrder = asyncErrors(async (req, res, next) => {
    const order = await Orders.findById(req.params.id);
    if (!order) {
        next(new ErrorHandler('Order not found', 404));
    }
    await order.remove();
    res.status(200).json({
        success: true,
        message: 'Order deleted successfully'
    });
})