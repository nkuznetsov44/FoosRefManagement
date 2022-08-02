import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { BreakpointProvider } from 'react-socks';
import { AuthProvider } from './auth/auth';
import App from './App';

ReactDOM.render(
    <BreakpointProvider>
        <AuthProvider>
            <App />
        </AuthProvider>
    </BreakpointProvider>,
    document.getElementById('root')
);