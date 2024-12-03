export const handleNavigateToBoards = (navigate: (path: string) => void): void => {
    navigate('/boards'); // Navigate to boards
};

export const handleBoardNavigation = (boardId: string, navigate: (path: string) => void) => {
    navigate(`/board/${boardId}`);
};

export const handleCreateBoardNavigation = (navigate: (path: string) => void) => {
    navigate('/create-board');
};