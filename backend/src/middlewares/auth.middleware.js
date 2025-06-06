import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res.status(401).json({ message: 'Unauthorized, no token provided' });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    const user = await User.findById(decoded.id).select('-password'); // Use 'id' instead of 'userId'

    if (!user) {
      return res.status(401).json({ message: 'Unauthorized, user not found' });
    }

    req.user = user; // Attach user to request object
    next(); // Proceed to the next middleware or route handler
  } catch (error) {
    console.error('Error in protectRoute middleware:', error);
    res.status(401).json({ message: 'Unauthorized, invalid token' });
  }
};
