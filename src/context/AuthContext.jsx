import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    // Initialize state with local storage values
    const [user, setUser] = useState(() => {
        try {
            const savedUser = localStorage.getItem('userData');
            return savedUser ? JSON.parse(savedUser) : null;
        } catch {
            return null;
        }
    });
    
    const [token, setToken] = useState(() => localStorage.getItem('token'));
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));

    const login = (newToken, userData) => {
        try {
            // Set token and user data in localStorage
            localStorage.setItem('token', newToken);
            localStorage.setItem('userData', JSON.stringify(userData));
            
            // Update state
            setToken(newToken);
            setUser(userData);
            setIsAuthenticated(true);
        } catch (error) {
            console.error('Error during login:', error);
        }
    };

    const logout = () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        
        // Reset state
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    const value = {
        user,
        token,
        isAuthenticated,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);