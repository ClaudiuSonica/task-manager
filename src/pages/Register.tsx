import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleRegister } from '../handlers/authHandlers';

const Register = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        handleRegister(email, password, navigate);
    };

    return (
        <div className="flex items-center justify-center h-screen">
            <form onSubmit={onSubmit} className="w-1/3 p-4 shadow-md bg-white">
                <h2 className="text-xl font-bold mb-4">Register</h2>
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
                <button type="submit" className="w-full bg-blue-500 text-white p-2">Register</button>
            </form>
        </div>
    );
};

export default Register;
