import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
//import { login } from '../auth';

/*const loginThunk = createAsyncThunk(
    'user/login',
    async (thunkAPI) => {
        return await login();
    }
);*/

const initialState = {
    user: JSON.parse(sessionStorage.getItem('user'))
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        login: (state, action) => {
            state.user = action.payload;
        },
        logout: (state) => {
            state.user = null;
        }
    }
});

export const { login, logout} = userSlice.actions;

export default userSlice.reducer;