import { useNavigate } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import { handleLogout } from '../handlers/authHandlers';
import {handleNavigateToBoards} from "../handlers/navigateHandlers.ts";


const Dashboard: React.FC = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600 mb-6">Welcome to Your Dashboard</h1>
            <div className="space-y-4">
                <button
                    onClick={() => handleNavigateToBoards(navigate)}
                    className="px-6 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
                >
                    Go to Kanban Board
                </button>
                <button
                    onClick={() => handleLogout(navigate)}
                    className="px-6 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                >
                    Logout
                </button>
            </div>
            <ToastContainer />
        </div>
    );
};

export default Dashboard;
