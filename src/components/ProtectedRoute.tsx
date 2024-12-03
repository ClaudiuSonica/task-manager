import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
    const token = localStorage.getItem('token'); // Check if token exists
    return token ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;