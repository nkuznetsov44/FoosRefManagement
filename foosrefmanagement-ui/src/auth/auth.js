import React, { useState, createContext, useContext, useEffect } from "react";
import axios from 'axios';
import notify from 'devextreme/ui/notify';

const AuthContext = createContext();

export const api = axios.create({});

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState();
    const [user, setUser] = useState();

    const login = async (telegramDataOnauth) => {
        const { data } = await axios.post('/api/auth/token/', telegramDataOnauth, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        localStorage.setItem('refresh_token', data.refresh);

        const user = {
            id: data.id,
            first_name: data.first_name,
            last_name: data.last_name,
            username: data.username,
            photo_url: data.photo_url
        };

        setAccessToken(data.access);
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem('refresh_token');
        setAccessToken(null);
        setUser(null);
    };

    useEffect(() => {
        api.interceptors.request.use(
            req => {
                if (accessToken) {
                    req.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return req;
            }
        );
    
        api.interceptors.response.use(
            res => { return res; },
            err => {
                const originalReq = err.config;
                const status = err.response ? err.response.status : null;

                if (status === 401) {
                    const refreshToken = localStorage.getItem('refresh_token');
                    if (!refreshToken) {
                        notify('Login required', 'error', 5000);
                    }

                    return axios.post('/api/auth/refresh/', {
                        refresh: refreshToken
                    }).then(response => {
                        setAccessToken(response.data.access);
                        return api(originalReq);
                    }).catch(err => {
                        console.error(err);
                        logout();
                        notify('Unauthorized', 'error', 5000);
                    });
                }

                throw(err);
            }
        );
    }, []);

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);