const API_URL = import.meta.env.VITE_API_URL;

export const login = async (email, password) => {
    try {
        const response = await fetch(`${API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            credentials: 'include',
            body: JSON.stringify({ email, password })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.message || 'Login failed');
        }

        return response.json();
    } catch (error) {
        throw new Error(error.message || 'Network error');
    }
};
