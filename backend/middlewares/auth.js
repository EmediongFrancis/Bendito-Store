const jwt = require('jsonwebtoken');
const user = require('../models/user');
const ErrorHandler = require('../utils/errorHandler');
const asyncErrors = require('./asyncErrors');

// Checks if user is authenticated.
exports.isAuthenticated = asyncErrors(async (req, res, next) => {
    const token = req.cookies.token;
    
    // Check if token is not provided.
    if (!token) {
        return next(new ErrorHandler('You need to be logged in to access this resource.', 401));
    }

    // Verify token.
    const verifiedToken = jwt.verify(token, process.env.JWT_SECRET);
    req.user = await user.findById(verifiedToken.id);

    next();
})
