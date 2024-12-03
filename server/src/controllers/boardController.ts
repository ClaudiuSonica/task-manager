import { Request, Response } from 'express';
import Board from '../models/Board';


// Fetch all boards for the logged-in user
export const getBoards = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = (req as any).user?.id; // Safely access req.user
        if (!userId) {
            res.status(401).json({ success: false, message: 'Unauthorized', data: [] });
            return;
        }

        const boards = await Board.find({ createdBy: userId });

        res.status(200).json({
            success: true,
            message: boards.length ? 'Boards fetched successfully' : 'No boards found',
            data: boards,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to fetch boards',
                details: error.message,
            });
        } else {
            res.status(500).json({ success: false, message: 'Unknown error occurred' });
        }
    }
};

// Create a new board
export const createBoard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { name } = req.body;
        const userId = (req as any).user?.id; // Assuming authentication middleware attaches user to req

        if (!name) {
            res.status(400).json({ success: false, message: 'Board name is required' });
            return;
        }

        const board = new Board({ name, createdBy: userId });
        await board.save();

        res.status(201).json({
            success: true,
            message: 'Board created successfully',
            data: board,
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to create the board',
                details: error.message,
            });
        } else {
            res.status(500).json({ success: false, message: 'Unknown error occurred' });
        }
    }
};


// Delete a board
export const deleteBoard = async (req: Request, res: Response): Promise<void> => {
    try {
        const { id } = req.params;
        const userId = (req as any).user?.id; // Assuming authentication middleware attaches user to req

        const board = await Board.findOneAndDelete({ _id: id, createdBy: userId });

        if (!board) {
            res.status(404).json({
                success: false,
                message: 'Board not found or unauthorized',
            });
            return;
        }

        res.status(200).json({
            success: true,
            message: 'Board deleted successfully',
        });
    } catch (error: unknown) {
        if (error instanceof Error) {
            res.status(500).json({
                success: false,
                message: 'Failed to delete the board',
                details: error.message,
            });
        } else {
            res.status(500).json({ success: false, message: 'Unknown error occurred' });
        }
    }
};

