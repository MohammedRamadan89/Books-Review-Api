const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes - checks for valid JWT
const protect = async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(" ")[1];
            const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

            req.user = await User.findById(decoded.id).select('-password');
            if (!req.user) {
                return res.status(401).json({ message: "User not found." });
            }

            next();
        } catch (error) {
            console.error(error);
            return res.status(401).json({ message: "Invalid token. Access denied." });
        }
    } else {
        return res.status(401).json({ message: "No token provided. Authorization denied." });
    }
};

module.exports = { protect };
