const ErrorHandler = require('../utils/errorHandler');

// Error handler middleware.
module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    
    // Handle development errors.
    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            success: false,
            message: err.message,
            error: err,
            stack: err.stack
        })
    }

    // Handle production errors.
    if (process.env.NODE_ENV === 'production') {
        let error = {...err};

        error.message = err.message

        // Handle Mongoose ObjectId errors.
        if (err.name === 'CastError') {
            const message = `Resource not found. Invalid: ${err.path}`;
            error = new ErrorHandler(message, 400);
        }

        // Handle Mongoose Validation errors.
        if (err.name === 'ValidationError') {
            const message = Object.values(err.errors).map(val => val.message);
            error = new ErrorHandler(message, 400);
        }

        res.status(error.statusCode).json({
            success: false,
            message: error.message || 'Something went wrong with the server.'
        })
    }
}