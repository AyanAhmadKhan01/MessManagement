import User from "../Models/User.js";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';

// Login user
export const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Validate input
    if (!email || !password) {
        return res.status(400).json({ 
            success: false,
            message: 'Email and password are required' 
        });
    }

    try {
        // Find user by email
        const user = await User.findOne({ email }).lean();

        if (!user) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        // Check password
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ 
                success: false,
                message: 'Invalid credentials' 
            });
        }

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.userId,
                email: user.email,
                role: user.role 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Return user data without password
        const { password: _, cpassword: __, ...userWithoutPassword } = user;

        res.status(200).json({
            success: true,
            message: 'Login successful',
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Login error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error during login' 
        });
    }
});

// Register user
export const registerUser = asyncHandler(async (req, res) => {
    const { name, email, mobileno, role = 0, password, cpassword } = req.body;

    // Validate input
    if (!name || !email || !password || !cpassword) {
        return res.status(400).json({ 
            success: false,
            message: 'All fields are required' 
        });
    }

    // Check if passwords match
    if (password !== cpassword) {
        return res.status(400).json({ 
            success: false,
            message: 'Passwords do not match' 
        });
    }

    try {
        // Check if user already exists
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(409).json({ 
                success: false,
                message: 'User already exists with this email' 
            });
        }

        // Create user object
        const userObject = {
            name,
            email,
            mobileno: mobileno || '',
            role: parseInt(role),
            password,
            cpassword
        };

        // Create new user (password will be hashed in pre-save hook)
        const user = await new User(userObject).save();

        // Generate JWT token
        const token = jwt.sign(
            { 
                userId: user.userId,
                email: user.email,
                role: user.role 
            },
            process.env.JWT_SECRET || 'your-secret-key',
            { expiresIn: '24h' }
        );

        // Return user data without password
        const { password: _, cpassword: __, ...userWithoutPassword } = user.toObject();

        res.status(201).json({
            success: true,
            message: 'User registered successfully',
            token,
            user: userWithoutPassword
        });

    } catch (error) {
        console.error('Registration error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error during registration' 
        });
    }
});

// Verify token (for protecting routes)
export const verifyToken = asyncHandler(async (req, res, next) => {
    const authHeader = req.headers.authorization;
    const token = authHeader && authHeader.startsWith('Bearer ') 
        ? authHeader.slice(7) 
        : req.headers['x-auth-token'];

    if (!token) {
        return res.status(401).json({ 
            success: false,
            message: 'Access denied. No token provided.' 
        });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET || 'your-secret-key');
        req.user = decoded;
        next();
    } catch (error) {
        console.error('Token verification error:', error);
        res.status(403).json({ 
            success: false,
            message: 'Invalid token' 
        });
    }
});

// Get current user (protected route)
export const getCurrentUser = asyncHandler(async (req, res) => {
    try {
        const user = await User.findOne({ userId: req.user.userId })
            .select('-password -cpassword')
            .lean();

        if (!user) {
            return res.status(404).json({ 
                success: false,
                message: 'User not found' 
            });
        }

        res.status(200).json({
            success: true,
            user
        });

    } catch (error) {
        console.error('Get current user error:', error);
        res.status(500).json({ 
            success: false,
            message: 'Server error' 
        });
    }
});

// Role-based middleware
export const requireRole = (allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            return res.status(401).json({ 
                success: false,
                message: 'Access denied. User not authenticated.' 
            });
        }

        const userRole = req.user.role;
        if (!allowedRoles.includes(userRole)) {
            return res.status(403).json({ 
                success: false,
                message: 'Access denied. Insufficient permissions.' 
            });
        }

        next();
    };
};
