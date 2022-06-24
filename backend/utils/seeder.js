const Product = require('../models/product');
const dotenv = require('dotenv');
const connectDB = require('../config/database');

const products = require('../data/products');

// Set dotenv configuration
dotenv.config({ path: 'backend/config/config.env' });

// Inint DB connection.
connectDB();

// Write product seeder function.
const productSeeder = async () => {
    try {
        // Delete products from DB.
        await Product.deleteMany();
        console.log('Products deleted.');
        
        // Insert products to DB.
        await Product.insertMany(products);
        console.log('Products added.')
        process.exit();

    } catch(error) {
        console.log(error.message);
        process.exit();
    }
}

productSeeder();