import { RequestHandler } from 'express';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

export const authenticateUser: RequestHandler = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '');

    if (!token) {
        res.status(401).json({ success: false, message: 'Access denied. No token provided.' });
        return;
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
        (req as any).user = { id: decoded.id }; // Attach user data to the request
        next(); // Move to the next middleware
    } catch (error) {
        res.status(401).json({ success: false, message: 'Invalid token.' });
    }
};
