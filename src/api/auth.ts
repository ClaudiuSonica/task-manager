import axios from 'axios';

const BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const login = async (email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/auth/login`, { email, password });
    return response.data; // Return token or relevant data
};

export const register = async (email: string, password: string) => {
    const response = await axios.post(`${BASE_URL}/auth/register`, { email, password });
    return response.data; // Return token or relevant data
};
