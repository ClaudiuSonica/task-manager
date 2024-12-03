import express from 'express';
import { getBoards, createBoard, deleteBoard } from '../controllers/boardController';
import { authenticateUser } from '../middlewares/authMiddleware'; // Middleware to check authentication

const router = express.Router();

router.get('/', authenticateUser, getBoards);
router.post('/', authenticateUser, createBoard);
router.delete('/:id', authenticateUser, deleteBoard);

export default router;
