import jwt from 'jsonwebtoken';

export const generateToken = (userId,res)=>{
    const token = jwt.sign({ id: userId }, process.env.JWT_SECRET, {
        expiresIn: '7d', // Token expiration time
    });
    
    res.cookie('jwt', token, {
        maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days in milliseconds
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie
        sameSite: 'Strict', // Helps prevent CSRF attacks
        secure: process.env.NODE_ENV !== 'development', // Use secure cookies in development
    });
    
    return token;
}