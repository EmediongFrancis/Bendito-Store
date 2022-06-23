// Import app as express instance and DB config.
const app = require('./app');
const connectDB = require('./config/database');

// Import env-var module and specify path to vars.
const dotenv = require('dotenv');

dotenv.config({ path: 'backend/config/config.env' });

// Inint DB connection.
connectDB();

// Use app to listen for connections.
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT} in ${process.env.NODE_ENV} mode.`);
})
