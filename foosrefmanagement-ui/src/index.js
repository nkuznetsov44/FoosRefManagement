import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BreakpointProvider } from 'react-socks';
import { AuthProvider } from './auth/AuthProvider';
import { AxiosInstanceProvider } from './auth/AxiosInstanceProvider';
import App from './App';

ReactDOM.render(
    <BreakpointProvider>
        <AuthProvider>
            <AxiosInstanceProvider>
                <App />
            </AxiosInstanceProvider>
        </AuthProvider>
    </BreakpointProvider>,
    document.getElementById('root')
);