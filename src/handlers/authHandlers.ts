import { login as apiLogin, register as apiRegister } from '../api/auth';
import { showToast } from '../utils/toast';

export const handleLogin = async (
    email: string,
    password: string,
    navigate: (path: string) => void
) => {
    try {
        const data = await apiLogin(email, password);
        localStorage.setItem('token', data.token);
        navigate('/dashboard');
    } catch (error: any) {
        const errorMsg = error.response?.data?.message || 'An unexpected error occurred';
        showToast(errorMsg, 'error');
    }
};

export const handleRegister = async (
    email: string,
    password: string,
    navigate: (path: string) => void
) => {
    try {
        const data = await apiRegister(email, password);
        localStorage.setItem('token', data.token);
        showToast('Registered successfully!', 'success');
        navigate('/dashboard');
    } catch (error: any) {
        const errorMsg = error.response?.data?.message || 'An unexpected error occurred';
        showToast(errorMsg, 'error');
    }
};

export const handleLogout = (navigate: (path: string) => void) => {
    localStorage.removeItem('token');
    navigate('/login');
};
