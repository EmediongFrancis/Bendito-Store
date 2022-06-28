const User = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('../middlewares/asyncErrors');
const sendToken = require('../utils/jwToken');
const sendEmail = require('../utils/sendEmail');
const crypto = require('crypto');

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

    try {
        await user.save();
        sendToken(user, 200, res)
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
    sendToken(user, 200, res)
})

// Forgot password.
exports.forgotPassword = asyncErrors(async (req, res, next) => {
    const user = await User.findOne({email: req.body.email});

    // Check if email exists.
    if (!user) {
        return next(new ErrorHandler('User with this email address not found', 404))
    }

    // Get reset token.
    const resetToken = user.getResetPasswordToken();

    await user.save({validateBeforeSave: false});

    // Create Reset Password URL.
    const resetURL = `${req.protocol}://${req.get('host')}/api/v1/password/reset/${resetToken}`;
    const message = `Your password reset token is:\n\n${resetURL}\n\nIf you did not request for a password reset, kindly ignore this email.`

    try {
        
        await sendEmail({
            email: user.email,
            subject: 'Bendito Store Password Recovery',
            message: message
        })

        res.status(200).json({
            success: true,
            message: `Email sent to ${user.email}`
        })

    } catch (error) {
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save({validateBeforeSave: false});

        return next(new ErrorHandler(error.message, 500));
    }
})

// Reset password.
exports.resetPassword = asyncErrors(async (req, res, next) => {
    const resetPasswordToken = crypto.createHash('sha256').update(req.params.token).digest('hex');
    const user = await User.findOne({
        resetPasswordToken,
        resetPasswordExpire: { $gt: Date.now() }
    })

    if (!user) {
        return next(new ErrorHandler('Invalid or expired token', 400));
    }
    
    if (req.body.password !== req.body.confirmPassword) {
        return next(new ErrorHandler('Passwords do not match', 400));
    }

    // Set new password.
    user.password = req.body.password;
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;

    await user.save();

    sendToken(user, 200, res)
})

// Logout a user.
exports.logoutUser = asyncErrors(async (req, res, next) => {
    res.cookie('token', null, {
        expires: new Date(Date.now()),
        httpOnly: true
    });
    res.status(200).json({
        success: true,
        message: 'Logged out successfully.'
    });
})
