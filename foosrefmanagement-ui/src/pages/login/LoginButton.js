import React from 'react';
import { useNavigate } from "react-router-dom";
import { Button } from 'devextreme-react/button';
import { logout } from '../../auth';


const LoginButton = (props) => {
    const navigate = useNavigate();

    const loginClick = (e) => {
        navigate('/login', { replace: true });
    };

    const Login = () => {
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

    const logoutClick = (e) => {
        (async () => {
            await logout();
        })();
    };

    const Logout = () => {
        return (
            <React.Fragment>
                <div className="dx-field-label">{`Logged in as ${props.user}`}</div>
                <Button
                    width={120}
                    text="Logout"
                    type="normal"
                    stylingMode="contained"
                    onClick={logoutClick}
                />
            </React.Fragment>
        )
    };

    if (props.user != undefined) {
        return <Logout />;
    }
    return <Login />
};

export default LoginButton;