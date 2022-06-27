// Import the express module.
const express = require('express');
const app = express();

// Import error handler middleware.
const errorMiddleware = require('../backend/middlewares/errors');

// Configure express to use json as default content type.
app.use(express.json());

// Import routes.
const products = require('./routes/products');
const auth = require('./routes/auth');

// Use routes.
app.use('/api/v1', products);
app.use('/api/v1', auth);

// Use error handler middleware.
app.use(errorMiddleware);

// Export the app.
module.exports = app;
