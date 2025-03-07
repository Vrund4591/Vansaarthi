import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login, register } from '../api';
import { useAuth } from '../context/AuthContext';
import Card from './Card';

const Auth = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { login: authLogin } = useAuth();
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        const formData = new FormData(e.target);
        
        try {
            let response;
            if (isLogin) {
                response = await login(
                    formData.get('email'),
                    formData.get('password')
                );
            } else {
                response = await register(
                    formData.get('username'),
                    formData.get('email'),
                    formData.get('password')
                );
            }
            
            if (response.token) {
                authLogin(response.token, response.user);
                navigate('/');
            }
        } catch (err) {
            setError(err.message || 'Authentication failed');
        }
    };

    const handleGoogleLogin = () => {
        window.location.href = `${import.meta.env.VITE_API_URL}/api/auth/google`;
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 px-4">
            <Card backgroundColor="bg-white" textColor="text-black">
                <div className="p-6">
                    <h2 className="text-2xl font-bold mb-6">{isLogin ? 'Login' : 'Sign Up'}</h2>
                    {error && <div className="text-red-500 mb-4">{error}</div>}
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <div className="mb-4">
                                <label className="block mb-2">Username</label>
                                <input type="text" name="username" className="w-full p-2 border rounded" required />
                            </div>
                        )}
                        <div className="mb-4">
                            <label className="block mb-2">Email</label>
                            <input type="email" name="email" className="w-full p-2 border rounded" required />
                        </div>
                        <div className="mb-4">
                            <label className="block mb-2">Password</label>
                            <input type="password" name="password" className="w-full p-2 border rounded" required />
                        </div>
                        <button type="submit" className="w-full bg-[#3BDE3B] text-white p-2 rounded">
                            {isLogin ? 'Login' : 'Sign Up'}
                        </button>
                    </form>
                    <div className="mt-4">
                        <button
                            onClick={handleGoogleLogin}
                            className="w-full bg-white border border-gray-300 text-gray-700 p-2 rounded flex items-center justify-center gap-2"
                        >
                            <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                            Continue with Google
                        </button>
                    </div>
                    <button 
                        className="mt-4 text-sm text-blue-500"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? 'Need an account? Sign up' : 'Already have an account? Login'}
                    </button>
                </div>
            </Card>
        </div>
    );
};

export default Auth;
