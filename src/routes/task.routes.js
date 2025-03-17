import { Router } from 'express';
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from '../controllers/task.controller.js';
import { authenticateToken } from '../middleware/auth.middleware.js';
import { body } from 'express-validator';

const router = Router();

// All routes require authentication
router.use(authenticateToken);

router.post('/', [
  body('title').notEmpty().withMessage('Title is required'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
], createTask);

router.get('/', getTasks);
router.get('/:id', getTask);

router.put('/:id', [
  body('title').optional().notEmpty().withMessage('Title cannot be empty'),
  body('status').optional().isIn(['pending', 'in_progress', 'completed']).withMessage('Invalid status'),
  body('dueDate').optional().isISO8601().withMessage('Invalid date format'),
], updateTask);

router.delete('/:id', deleteTask);

export default router;