const jwt = require('jsonwebtoken');

// Generate JWT token for a user ID
const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET_KEY, {
        expiresIn: '1h'
    });
};

module.exports = generateToken;
