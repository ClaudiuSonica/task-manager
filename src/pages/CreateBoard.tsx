import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {handleCreateBoard} from "../handlers/boardHandlers.ts";

const CreateBoard: React.FC = () => {
    const [boardName, setBoardName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await handleCreateBoard(boardName, navigate);
        } catch (error) {
            console.error('Failed to create board:', error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form
                onSubmit={handleSubmit}
                className="w-1/3 p-4 bg-white shadow-md rounded-md"
            >
                <h2 className="text-2xl font-bold mb-4 text-center">Create New Board</h2>
                <input
                    type="text"
                    placeholder="Enter board name"
                    value={boardName}
                    onChange={(e) => setBoardName(e.target.value)}
                    className="w-full p-2 border rounded-md mb-4"
                    required
                />
                <button
                    type="submit"
                    className={`w-full p-2 text-white rounded-md ${
                        loading
                            ? 'bg-gray-400 cursor-not-allowed'
                            : 'bg-blue-500 hover:bg-blue-600 transition'
                    }`}
                    disabled={loading}
                >
                    {loading ? 'Creating...' : 'Create Board'}
                </button>
            </form>
        </div>
    );
};

export default CreateBoard;
