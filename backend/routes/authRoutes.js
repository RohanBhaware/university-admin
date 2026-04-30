import express from 'express';
import { authAdmin, registerAdmin, verifyToken } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/login', authAdmin);
router.post('/register', registerAdmin);
router.get('/verify', protect, verifyToken);

export default router;
