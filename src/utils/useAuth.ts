import { useNavigate } from 'react-router-dom';

export const useAuth = () => {
    const navigate = useNavigate();

    const login = (token: string) => {
        localStorage.setItem('token', token);
        navigate('/dashboard');
    };

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    const isAuthenticated = () => !!localStorage.getItem('token');

    return { login, logout, isAuthenticated };
};
