import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(sessionStorage.getItem('access_token'));
    const [refreshToken, setRefreshToken] = useState(sessionStorage.getItem('refresh_token'));
    const [user, setUser] = useState(JSON.parse(sessionStorage.getItem('user')));

    useEffect(() => {
        sessionStorage.setItem('access_token', accessToken);
    }, [accessToken]);

    useEffect(() => {
        sessionStorage.setItem('refresh_token', refreshToken);
    }, [refreshToken]);

    useEffect(() => {
        sessionStorage.setItem('user', JSON.stringify(user));
    }, [user]);

    const login = async (telegramDataOnauth) => {
        const { data } = await axios.post('/api/auth/token/', telegramDataOnauth, {
            headers: {
                "Content-Type": "application/json"
            }
        });
    
        const user = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            photo_url: data.photo_url
        };
    
        setAccessToken(data.access);
        setRefreshToken(data.refresh);
        setUser(user);
    };

    const logout = () => {
        setAccessToken(null);
        setRefreshToken(null);
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{
            user,
            login,
            logout,
            accessToken,
            refreshToken,
            setAccessToken
        }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);