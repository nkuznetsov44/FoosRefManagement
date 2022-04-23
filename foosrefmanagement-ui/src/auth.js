import axios from 'axios';

export const login = async (username, password) => {
    const { data } = await axios.post('/api/auth/login/', {
        username: username,
        password: password
    }, {
        headers: {
            "Content-Type": "application/json"
        }
    });
    localStorage.setItem('refresh_token', data.refresh);
    sessionStorage.setItem('access_token', data.access);
    sessionStorage.setItem('user', data.user.username);
    return data.user.username;
};

export const api = axios.create({});

export const logout = () => {
    localStorage.removeItem('refresh_token');
    sessionStorage.removeItem('access_token');
    sessionStorage.removeItem('user');
    window.location.reload()
};

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
                console.log('Updated access and refresh tokens.');
                return api(originalReq);
            }).catch(err => {
                localStorage.removeItem('refresh_token');
                sessionStorage.removeItem('access_token');
                sessionStorage.removeItem('user');
                window.location.replace('/login');
            });
        }
    }
);