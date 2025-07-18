import express from 'express';
import { 
    loginUser, 
    registerUser, 
    getCurrentUser, 
    verifyToken 
} from '../Controller/authController.js';

const router = express.Router();

// Public routes
router.post('/login', loginUser);
router.post('/register', registerUser);

// Protected routes
router.get('/me', verifyToken, getCurrentUser);

export default router;
