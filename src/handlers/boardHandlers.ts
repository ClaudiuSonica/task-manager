import { fetchBoards, createBoard } from '../api/boards';
import { showToast } from '../utils/toast';

export const getBoardsHandler = async (
    setBoards: React.Dispatch<React.SetStateAction<any[]>>,
    setLoading: React.Dispatch<React.SetStateAction<boolean>>,
    setError: React.Dispatch<React.SetStateAction<string>>
) => {
    try {
        setLoading(true);
        const response = await fetchBoards();
        if (response.success) {
            setBoards(response.data || []); // Default to an empty array
        } else {
            setError(response.message || 'Failed to fetch boards');
            showToast('Failed to fetch boards', 'error');
        }
    } catch (error: any) {
        const errorMsg = error.response?.data?.message || 'Failed to fetch boards';
        setError(errorMsg);
        showToast(errorMsg, 'error');
    } finally {
        setLoading(false);
    }
};

export const handleCreateBoard = async (
    name: string,
    navigate: (path: string) => void
) => {
    try {
        const response = await createBoard(name);
        showToast(response.message, 'success');
        navigate('/boards');
    } catch (error: any) {
        const errorMsg =
            error.response?.data?.message || 'Failed to create the board';
        showToast(errorMsg, 'error');
        throw error; // Rethrow to allow loading to stop
    }
};
