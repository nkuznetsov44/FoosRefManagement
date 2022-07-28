import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userSlice';

export const store = configureStore({
    name: 'store',
    reducer: {
        user: userReducer
    }
});