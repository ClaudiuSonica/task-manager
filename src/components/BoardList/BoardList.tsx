import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getBoardsHandler } from '../../handlers/boardHandlers';
import {handleBoardNavigation, handleCreateBoardNavigation} from "../../handlers/navigateHandlers.ts";

const BoardList: React.FC = () => {
    const [boards, setBoards] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        getBoardsHandler(setBoards, setLoading, setError);
    }, []);

    if (loading) return <div>Loading boards...</div>;
    if (error) return <div className="text-red-500">{error}</div>;

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">My Boards</h1>
            {boards && boards.length === 0 ? (
                <div className="text-center mt-6">
                    <p className="text-gray-600 text-lg">You don't have any boards yet.</p>
                    <button
                        onClick={() => handleCreateBoardNavigation(navigate)} // Replace with the correct route
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                    >
                        Create Your First Board
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-3 gap-4">
                    {boards.map((board) => (
                        <div
                            key={board._id}
                            onClick={() => handleBoardNavigation(board._id, navigate)}
                            className="cursor-pointer p-4 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600 transition"
                        >
                            {board.name}
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default BoardList;
