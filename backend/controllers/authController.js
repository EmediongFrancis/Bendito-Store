const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middlewares/asyncErrors');

// Register a new user.
exports.registerUser = asyncErrors(async (req, res, next) => {
    const { name, email, password } = req.body;
    const user = new User({
        name,
        email,
        password,
        photo: {
            public_id: '',
            url: ''
        }
    });
    try {
        await user.save();
        res.status(201).json({
            success: true,
            user
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
})