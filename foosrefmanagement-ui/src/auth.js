import axios from 'axios';
import notify from 'devextreme/ui/notify';
import { store } from './store/store';
import { login as loginAction, logout as logoutAction } from './store/userSlice'

export const login = async (telegramDataOnauth) => {
    const { data } = await axios.post('/api/auth/token/', telegramDataOnauth, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    localStorage.setItem('refresh_token', data.refresh);
    sessionStorage.setItem('access_token', data.access);
    const user = {
        id: data.id,
        first_name: data.first_name,
        last_name: data.last_name,
        username: data.username,
        photo_url: data.photo_url
    };
    sessionStorage.setItem('user', JSON.stringify(user));
    store.dispatch(loginAction(user));  //TODO: doesn't work, maybe need createAsyncThunk
    // return user;
};

export const logout = () => {
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
    store.dispatch(logoutAction());
};

export const api = axios.create({});

api.interceptors.request.use(
    req => {
        const accessToken = sessionStorage.getItem('access_token');
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
            return axios.post('/api/auth/refresh/', {
                refresh: localStorage.getItem('refresh_token')
            }).then(response => {
                sessionStorage.setItem('access_token', response.data.access);
                return api(originalReq);
            }).catch(err => {
                logout();
                notify('Login required', 'error', 5000);
            });
        }
        throw(err);
    }
);