

// Create and save token in cookie.
const sendToken = (user, statusCode, res) => {

    // Create token.
    const token = user.getSignedJwtToken()

    // Cokkie options.
    const options = {
        expires: new Date(
            Date.now() + process.env.COOKIE_EXPIRATION * 24 * 60 * 60 * 1000
        ),
        httpOnly: true
    }

    res.status(statusCode).cookie('token', token, options).json({
        success: true,
        token,
        user
    })
}

module.exports = sendToken;
