import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove the token from localStorage
        navigate('/login'); // Redirect to the login page
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
            <h1 className="text-4xl font-bold text-blue-600 mb-4">Welcome to the Dashboard</h1>
            <p className="text-lg text-gray-700 mb-6">This is a protected route.</p>
            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-6 py-2 rounded-md hover:bg-red-600 transition"
            >
                Logout
            </button>
        </div>
    );
};

export default Dashboard;
