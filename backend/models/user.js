const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');

// Define user schema.
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Enter your name'],
        maxlength: [30, 'Name can not be more than 50 characters'],
        minlength: [3, 'Name can not be less than 3 characters']
    },
    email: {
        type: String,
        required: [true, 'Enter your email'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'Enter a valid email address']
    },
    password: {
        type: String,
        required: [true, 'Enter your password'],
        minlength: [8, 'Password can not be less than 8 characters'],
        maxlength: [50, 'Password can not be more than 50 characters'],
        select: false
    },
    photo: {
        public_id: {
            type: String,
            required: true,
        },
        url: {
            type: String,
            required: true,
        }
    },
    role: {
        type: String,
        default: 'user'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    resetPasswordToken: String,
    resetPasswordExpire: Date

})

// Encrypt password before saving.
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) {
        next();
    }

    this.password = await bcrypt.hash(this.password, 12);

})

module.exports = mongoose.model('User', userSchema);