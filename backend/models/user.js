const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');

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

// Validate password.
userSchema.methods.validatePassword = async function (insertedPassword) {
    return await bcrypt.compare(insertedPassword, this.password);
}

// Return JWT token after successful login.
userSchema.methods.getSignedJwtToken = function () {
    return jwt.sign({ id: this._id }, process.env.JWT_SECRET, { 
        expiresIn: process.env.JWT_EXPIRE });
}

// Generate and return random password reset token.
userSchema.methods.getResetPasswordToken = function () {

    // Generate token.
    const resetToken = crypto.randomBytes(20).toString('hex');

    // Hash token and set to resetPasswordToken field.
    this.resetPasswordToken = crypto.createHash('sha256').update(resetToken).digest('hex');

    // Set expire time.
    this.resetPasswordExpire = Date.now() + 30 * 60 * 1000; // 30 minutes.

    return resetToken;
}

module.exports = mongoose.model('User', userSchema);