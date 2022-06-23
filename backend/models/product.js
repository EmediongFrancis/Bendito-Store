// Import mongoose (for DB schema).
const mongoose = require('mongoose');

// Write product schema using Schema object.
const productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter product name'],
        trim: true,
        maxlength: [100, 'Product name cannot be more than 100 characters']
    },
    price: {
        type: Number,
        required: [true, 'Enter product price'],
        maxlength: [6, 'Product price cannot be more than 6 characters'],
        default: 0.0
    },
    description: {
        type: String,
        required: [true, 'Enter product description']
    },
    ratings: {
        type: Number,
        default: 0
    },
    images: [{
        public_id: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        }
    }],
    category: {
        type: String,
        required: [true, 'Enter product category'],
        enum: {
            values: [
                'Clothing',
                'Shoes',
                'Headphones',
                'Food',
                'Books',
                'Beauty/Health',
                'Sports',
                'Outdoor',
                'Home',
                'Phones',
                'Laptops/Computers',
                'Baby/kid accessories',
                'Kitchen Utensils',
                'Electronic gadgets'
            ],
            message: 'Select correct product category'
        }
    },
    vendor: {
        type: String,
        required: [true, 'Enter product vendor']
    },
    stock: {
        type: Number,
        required: [true, 'Enter currently available product stock'],
        maxLength: [5, 'Stock cannot exceed 5 characters'],
        default: 0
    },
    totalReviews: {
        type: Number,
        default: 0
    },
    reviews: [
        {
            name: {
                type: String,
                required: true
            },
            rating: {
                type: Number,
                required: true
            },
            comment: {
                type: String,
                required: true
            }
        }
    ],
    createdAt: {
        type: Date,
        default: Date.now
    }
})

module.exports = mongoose.model('Product', productSchema);
