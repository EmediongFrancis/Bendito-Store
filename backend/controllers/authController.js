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
            public_id: 'fkmggkgg',
            url: 'fdlf;lff'
        }
    });

    const token = user.getSignedJwtToken();

    try {
        await user.save();
        res.status(201).json({
            success: true,
            token
        });
    } catch (error) {
        next(new ErrorHandler(error.message, 400));
    }
})

// Login a user.
exports.loginUser = asyncErrors(async (req, res, next) => {
    const { email, password } = req.body;

    // Check if credentials are provided.
    if (!email || !password) {
        return next(new ErrorHandler('Provide email and password', 400));
    }

    // Check if user exists.
    const user = await User.findOne({ email }).select('+password');
    if (!user) {
        return next(new ErrorHandler('Invalid credentials', 401));
    }

    // Check if password is correct.
    const isPasswordValid = await user.validatePassword(password);

    if (!isPasswordValid) {
        return next(new ErrorHandler('Invalid credentials', 401));
    }

    // Return JWT token.
    const token = user.getSignedJwtToken();
    res.status(200).json({
        success: true,
        token
    });
})