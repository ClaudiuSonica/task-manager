import axios from 'axios';

const BASE_URL = import.meta.env.REACT_APP_API_URL || 'http://localhost:5000/api';

export const fetchBoards = async () => {
    const response = await axios.get(`${BASE_URL}/boards`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
        },
    });
    return response.data;
};

export const createBoard = async (name: string) => {
    const response = await axios.post(
        `${BASE_URL}/boards`,
        { name },
        {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
            },
        }
    );
    return response.data;
};

