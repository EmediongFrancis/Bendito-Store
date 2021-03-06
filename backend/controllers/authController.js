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

        // Check if user already exists.
        const oldUser = await User.findOne({ email });
        if (oldUser) {
            return next(new ErrorHandler('A user with this email already exists', 400));
        }
        
        await user.save();
        sendToken(user, 200, res);

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

// Get currently logged in user.
exports.getMe = asyncErrors(async (req, res, next) => {

        const user = await User.findById(req.user.id);
        res.status(200).json({
            success: true,
            user
        });

    })

// Update or change password of currently logged in user.
exports.updatePassword = asyncErrors(async (req, res, next) => {
    const user = await User.findById(req.user.id).select('+password');

    // Check if old password is correct.
    const isPasswordValid = await user.validatePassword(req.body.oldPassword);
    if (!isPasswordValid) {
        return next(new ErrorHandler('Incorrect old password', 400));
    }

    // Check if new password is same as old password.
    if (req.body.newPassword === req.body.oldPassword) {
        return next(new ErrorHandler('New password is same as old password', 400));
    }

    // Set new password.
    user.password = req.body.newPassword;
    await user.save();

    sendToken(user, 200, res)
})

// Update user profile.
exports.updateProfile = asyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email
        // Update photo: TODO!
        }
    
    // Fetch user and update data.
    const user = await User.findByIdAndUpdate(req.user.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })
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

// ______________________________________________________
// ------------------- ADMIN ROUTES ---------------------
// ______________________________________________________

// Get all users.
exports.getAllUsers = asyncErrors(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        users
    });
})

// Get user by id.
exports.getUserById = asyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
    }
    res.status(200).json({
        success: true,
        user
    });
})

// Update user to admin.
exports.updateAdminProfile = asyncErrors(async (req, res, next) => {
    const newUserData = {
        name: req.body.name,
        email: req.body.email,
        role: req.body.role
        }
    
    // Fetch user and update data.
    const user = await User.findByIdAndUpdate(req.params.id, newUserData, {
        new: true,
        runValidators: true,
        useFindAndModify: false
    });

    res.status(200).json({
        success: true,
        user
    })
})

// Delete user.
exports.deleteUser = asyncErrors(async (req, res, next) => {
    const user = await User.findById(req.params.id);
    
    if (!user) {
        return next(new ErrorHandler(`User not found with id: ${req.params.id}`, 404));
    }

    await user.remove();
    
    res.status(200).json({
        success: true,
        user
    });
})