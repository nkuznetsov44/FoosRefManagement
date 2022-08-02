import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { store } from './store/store';
import { Provider } from 'react-redux';
import  { BreakpointProvider } from 'react-socks';
import App from './App';


ReactDOM.render(
    <Provider store={store}>
        <BreakpointProvider>
            <App />
        </BreakpointProvider>
    </Provider>,
    document.getElementById('root')
);