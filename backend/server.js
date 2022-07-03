// Import app as express instance and DB config.
const app = require('./app');
const connectDB = require('./config/database');

// Import env-var module and specify path to vars.
const dotenv = require('dotenv');

// Handle uncaught exceptions.
process.on('uncaughtException', (err) => {
    console.log('Shutting server down due to uncaught exception...');
    console.log(`Error: ${err.message}`);
    process.exit(1);
});

// Specify path to vars.
dotenv.config({ path: 'backend/config/config.env' });

// Inint DB connection.
connectDB();

// Use app to listen for connections.
const server = app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})

// Handle unhandled promise rejections.
process.on('unhandledRejection', err => {
    console.log(`Error: ${err.message}`);
    // Close server & exit process.
    console.log('Shutting server down due to unhandled promise rejections...');
    server.close(() => process.exit(1));
});
