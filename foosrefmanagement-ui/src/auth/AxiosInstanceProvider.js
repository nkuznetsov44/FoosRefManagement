import React, { useRef, createContext, useContext, useEffect, useMemo } from "react";
import axios from 'axios';
import { useAuth } from "./AuthProvider";
import notify from "devextreme/ui/notify";

const AxiosContext = createContext(null);

export const AxiosInstanceProvider = ({ children }) => {
    const {
        logout,
        accessToken,
        setAccessToken,
        refreshToken
    } = useAuth();

    const instanseRef = useRef(axios.create({}));

    useEffect(() => {
        instanseRef.current.interceptors.request.use(
            request => {
                if (accessToken) {
                    request.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return request;
            }
        );

        instanseRef.current.interceptors.response.use(
            response => response,
            error => {
                const originalReq = error.config;
                const status = error.response ? error.response.status : null;

                if (status === 401) {
                    if (!refreshToken) {
                        notify('Login required', 'error', 5000);
                    }

                    return axios.post('/api/auth/refresh/', {
                        refresh: refreshToken
                    }).then(response => {
                        setAccessToken(response.data.access);
                        return instanseRef.current(originalReq);
                    }).catch(err => {
                        console.error(err);
                        logout();
                        notify('Unauthorized', 'error', 5000);
                    });
                }

                throw(error);
            }
        );
    }, [accessToken, refreshToken]);

    return (
        <AxiosContext.Provider value={instanseRef.current}>
            {children}
        </AxiosContext.Provider>
    );
};

export const useAxios = () => {
    const contextInstance = useContext(AxiosContext);

    const api = useMemo(() => {
        return contextInstance;
    }, [contextInstance]);

    return { api };
};