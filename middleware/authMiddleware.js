const jwt = require('jsonwebtoken');
require('dotenv').config();

const authMiddleware = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    console.log('Token:', token);
    if (!token) {
        return res.status(401).send({ error: 'Access denied. No token provided.' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        console.log('Decoded:', decoded);
        req.user = decoded;
        next();
    } catch (ex) {
        console.error('Token verification failed:', ex.message);
        res.status(400).send({ error: 'Invalid token.' });
    }
};

module.exports = authMiddleware;