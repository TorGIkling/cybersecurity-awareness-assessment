import React, {useState, createContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';

interface AuthContextType {
    isAuthenticated: boolean;
    login: (token: string) => void;
    logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider ({children}: {children: React.ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        if (token) {
            const isValid = validateToken(token);
            setIsAuthenticated(isValid);
            if (!isValid) {
                localStorage.removeItem('authToken');
                navigate('/login');
            }
        }
    },[])

    const validateToken = (token: string): boolean => {
        try {
            const payload = JSON.parse(atob(token.split('.')[1]));
            return payload.exp * 1000 > Date.now();
        }catch {
            return false;
        }
    }

    const login = (token: string) => {
        localStorage.setItem('authToken', token);
        setIsAuthenticated(true);
        navigate('/');
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsAuthenticated(false);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}
export default AuthProvider;