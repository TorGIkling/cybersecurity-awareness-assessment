import React, {useState, createContext, useEffect, useLayoutEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from "jwt-decode";

interface AuthContextType {
    isAuthenticated: boolean;
    username: string | null;
    organizationId: number | null;
    userId: number | null;
    role: string | null;
    hasAnswered: boolean;
    loading: boolean;
    login: (token: string, refreshToken: string) => void;
    logout: () => void;
}

interface DecodedToken {
    username: string;
    userId: number;
    email: string;
    organizationId: number;
    hasAnswered: boolean;
    role: string;
    exp: number;
}

export const AuthContext = createContext<AuthContextType | null>(null);

function AuthProvider ({children}: {children: React.ReactNode}) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [loading, setLoading] = useState(true);
    const [username, setUsername] = useState<string | null>(null);
    const [organizationId, setOrganizationId] = useState<number | null>(null);
    const [hasAnswered, setHasAnswered] = useState<boolean>(false);
    const [userId, setUserId] = useState<number | null>(null);
    const [role, setRole] = useState<string | null>(null);
    const navigate = useNavigate();

    useLayoutEffect(() => {
        const initAuth = () => {
            const token = localStorage.getItem('authToken');
            const refreshToken = localStorage.getItem('refreshToken');
            let isValid = false;
            if (token) {
                isValid = validateToken(token);

                if (isValid) {
                    const decodedToken: DecodedToken = JSON.parse(atob(token.split('.')[1]));
                    console.log('Decoded Token:',decodedToken);
                    setUsername(decodedToken.username);
                    setUserId(decodedToken.userId);
                    setOrganizationId(decodedToken.organizationId);
                    setRole(decodedToken.role);
                    setHasAnswered(decodedToken.hasAnswered);
                    setIsAuthenticated(true);
                    console.log('authenticated:',isAuthenticated);
                    scheduleTokenRefresh(token, refreshToken!);
                } else {
                    localStorage.removeItem('authToken');
                    localStorage.removeItem('refreshToken');


                }
            }

            if (!isValid) {
                setIsAuthenticated(false);
                navigate('/login');
            }
            setLoading(false);
        }
        initAuth();
    },[navigate]);

    useEffect(() => {
        if (isAuthenticated) {
            console.log('authenticated');
        }
    }, [isAuthenticated]);

    const validateToken = (token: string): boolean => {
        try {
            const payload = jwtDecode<DecodedToken>(token);
            return payload.exp * 1000 > Date.now();
        }catch {
            return false;
        }
    }

    const scheduleTokenRefresh = (token: string, refreshToken: string) => {
        const payload = jwtDecode<DecodedToken>(token);
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
            alert("Invalid token during sign in");
        }

    };

    const logout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('refreshToken');
        setIsAuthenticated(false);
        setUsername(null);
        setOrganizationId(null);
        setRole(null);
        navigate('/login');
    }

    return (
        <AuthContext.Provider value={{ isAuthenticated,username, organizationId, userId, role, hasAnswered ,loading , login, logout }}>
            {children}
        </AuthContext.Provider>
    );

}
export default AuthProvider;