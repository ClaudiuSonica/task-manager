import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import axios from 'axios';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:5000/api/auth/login', { email, password });
            localStorage.setItem('token', data.token); // Save the token
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            if (error instanceof AxiosError) {
                console.error('Login failed:', error.response?.data);
            } else {
                console.error('An unexpected error occurred.');
            }
        }
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={handleLogin} className="w-1/3 p-4 shadow-md bg-white">
                <h2 className="text-xl font-bold mb-4">Login</h2>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-2 border mb-4"
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-2 border mb-4"
                />
                <button type="submit" className="w-full bg-blue-500 text-white p-2">Login</button>
            </form>
        </div>
    );
};

export default Login;
