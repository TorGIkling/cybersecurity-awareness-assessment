import React, {useState, createContext, useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    organizationId: number | null;
    role: string | null;
    login: (token: string, refreshToken: string) => void;
    logout: () => void;
}

interface DecodedToken {
    username: string;
    email: string;
    organizationId: number;
    role: string;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider ({children}: {children: React.ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [username, setUsername] = useState<string | null>(null);
    const [organizationId, setOrganizationId] = useState<number | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('authToken');
        const refreshToken = localStorage.getItem('refreshToken');
        if (token) {
            const isValid = validateToken(token);
            setIsAuthenticated(isValid);
            if (!isValid) {
                localStorage.removeItem('authToken');
                const decodedToken: DecodedToken = JSON.parse(atob(token.split('.')[1]));
                setUsername(decodedToken.username);
                setOrganizationId(decodedToken.organizationId);
                setRole(decodedToken.role);
                scheduleTokenRefresh(token, refreshToken!);
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

    const scheduleTokenRefresh = (token: string, refreshToken: string) => {
        const payload = JSON .parse(atob(token.split('.')[1]));
        const expiresIn = payload.exp * 1000 - Date.now() - 5000; //Triggers refresh 5 sec before expiration
        if (expiresIn > 0) {
            setTimeout(() => {refreshAccessToken(refreshToken)}, expiresIn);
        }
    }

    const refreshAccessToken = async (refreshToken: string) => {
        const response = await fetch(process.env.REACT_APP_REST_API_URL + "/refresh", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({refreshToken}),
        });
        if (response.ok) {
            const data = await response.json();
            const token = data.token;
            const newRefreshToken = data.refreshToken;
            localStorage.setItem('authToken', token);
            localStorage.setItem('refreshToken', newRefreshToken);
            const decodedToken: DecodedToken = jwtDecode(token);
            setUsername(decodedToken.username);
            setOrganizationId(decodedToken.organizationId);
            setRole(decodedToken.role);
            scheduleTokenRefresh(token, newRefreshToken);
            login(token, refreshToken);
        } else {
            console.error("Failed to refresh token");
            alert("Feil under oppfriskning av token");
        }
    }

    const login = (token: string, refreshToken: string) => {
        if (!token.trim() || !refreshToken.trim()) {
            console.error("Invalid token:", token);
            return;
        }
        try {
            localStorage.setItem('authToken', token);
            localStorage.setItem('refreshToken', refreshToken);
            const decodedToken: DecodedToken = jwtDecode(token);
            setUsername(decodedToken.username);
            setOrganizationId(decodedToken.organizationId);
            setRole(decodedToken.role);
            console.log('Decoded token:', decodedToken);
            console.log('username:', decodedToken.username);
            console.log('organizationId', decodedToken.organizationId);
            setIsAuthenticated(true);
            scheduleTokenRefresh(token, refreshToken);
            navigate('/');
        }catch (error) {
            console.error("Error decoding token:", error);
            alert("Ugyldig token under innlogging");
        }

    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setUsername(null);
        setOrganizationId(null);
        setRole(null);
        alert("Du er logget ut");
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated,username, organizationId, role , login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}
export default AuthProvider;