import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user'))
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.user;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const { login, logout} = userSlice.actions;

export default userSlice.reducer;