// Import mongoose for MongoDB.
const mongoose = require('mongoose');

// Write DB connection logic.
const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(conBool => {
        console.log(`MongoDB Connected: ${conBool.connection.host}`);
    })
}

// Export connection logic to be used externally.
module.exports = connectDB;