import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const AuthSuccess = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { login } = useAuth();

    useEffect(() => {
        const params = new URLSearchParams(location.search);
        const token = params.get('token');
        const userData = params.get('userData');

        if (!token || !userData) {
            navigate('/login', { replace: true });
            return;
        }

        try {
            const user = JSON.parse(decodeURIComponent(userData));
            login(token, user);
            navigate('/', { replace: true });
        } catch (error) {
            console.error('Error processing authentication:', error);
            navigate('/login', { replace: true });
        }
    }, [location.search]); // Only depend on location.search

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="text-xl font-semibold">Completing authentication...</div>
        </div>
    );
};

export default AuthSuccess;