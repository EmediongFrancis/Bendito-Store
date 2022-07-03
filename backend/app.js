// Import the express module.
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');

// Import error handler middleware.
const errorMiddleware = require('../backend/middlewares/errors');

// Configure express to use json as default content type.
app.use(express.json());
app.use(cookieParser());

// Import routes (authentication, products, and orders).
const products = require('./routes/products');
const auth = require('./routes/auth');
const order = require('./routes/order');

// Use imported routes.
app.use('/api/v1', products);
app.use('/api/v1', auth);
app.use('/api/v1', order);

// Use error handler middleware.
app.use(errorMiddleware);

// Export the app.
module.exports = app;
