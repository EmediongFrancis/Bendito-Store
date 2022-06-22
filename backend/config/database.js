const mongoose = require('mongoose');


const connectDB = () => {
    mongoose.connect(process.env.MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }).then(conBool => {
        console.log(`MongoDB Connected: ${conBool.connection.host}`);
    })
}


module.exports = connectDB;