import { Router } from 'express';
import {register, login, getMyInfo, verifyToken} from '../controllers/auth.controller.js';
import { body } from 'express-validator';
import {authenticateToken} from "../middleware/auth.middleware.js";

const router = Router();

router.post('/register', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
  body('name').notEmpty().withMessage('Name is required'),
], register);

router.post('/login', [
  body('email').isEmail().withMessage('Please provide a valid email'),
  body('password').notEmpty().withMessage('Password is required'),
], login);

router.get('/me', getMyInfo).use(authenticateToken);
// Add the verify token route
router.get('/verify-token', verifyToken);

export default router;