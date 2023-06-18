const jwt = require('jsonwebtoken');

const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    // // Allow access to Swagger UI without authentication
    // if (req.path === '/api-docs' || req.path.startsWith('/api-docs/')) {
    //     return next();
    // }

    if (!token) {
        return res.status(401).json({ message: 'Authentication failed: Missing token' });
    }

    try {
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        console.log(decodedToken);
        req.user = decodedToken.username;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Authentication failed: Invalid token' });
    }
};

module.exports = { authenticateJWT };
