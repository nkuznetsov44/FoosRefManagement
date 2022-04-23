import React from 'react';
import { Button } from 'devextreme-react/button';
import { api, logout } from '../../auth';


const Login = () => {
    const loginClick = (e) => {
        window.location.replace('/login');
    };

    return (
        <Button
            width={120}
            text="Login"
            type="normal"
            stylingMode="contained"
            onClick={loginClick}
        />
    )
};

const Logout = () => {
    const logoutClick = (e) => {
        (async () => {
            await logout();
        })();
    };

    return (
        <Button
            width={120}
            text="Logout"
            type="normal"
            stylingMode="contained"
            onClick={logoutClick}
        />
    )
};

const LoginButton = () => {
    const [user, setUser] = React.useState(sessionStorage.getItem('user'));

    if (user == undefined) {
        return <Login />;
    }
    return <Logout />
};

export default LoginButton;