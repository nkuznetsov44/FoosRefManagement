import React, { useState, createContext, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState();
    const [refreshToken, setRefreshToken] = useState();
    const [user, setUser] = useState();

    const login = async (telegramDataOnauth) => {
        const { data } = await axios.post('/api/auth/token/', telegramDataOnauth, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        //localStorage.setItem('refresh_token', data.refresh);
    
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
        //localStorage.removeItem('refresh_token');
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