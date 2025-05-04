// Middleware to allow access based on user roles
const onlyAdmin = (...roles) => {
    return (req, res, next) => {
        if (!roles.includes(req.user.role)) {
            return res.status(403).json({
                message: "Permission denied. You do not have access to this resource."
            });
        }
        next();
    };
};

module.exports = { onlyAdmin };
