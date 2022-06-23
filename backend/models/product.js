const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please enter product name'],
        trim: true,
        maxlength: [100, 'Product name cannot be more than 100 characters']
    }
})

module.exports = mongoose.model('Product', productSchema);
