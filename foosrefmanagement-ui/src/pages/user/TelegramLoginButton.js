import React from 'react';
import { useNavigate } from "react-router-dom";
import notify from 'devextreme/ui/notify';
import TelegramLoginButton from 'react-telegram-login';
import { login } from '../../auth';

const LoginButton = () => {
    const navigate = useNavigate();

    const handleTelegramResponse = (dataOnauth) => {
        // console.log(dataOnauth);
        (async () => {
            try {
                await login(dataOnauth);
                navigate('/', { replace: true });
            }
            catch(e) {
                notify('Login failed', 'error', 5000);
                console.log(e);
            }
        })();
    };

    return (
        <TelegramLoginButton
            dataOnauth={handleTelegramResponse}
            botName="FoosRefManagementBot"  // TODO: to frontend conf
        />
    )
};

export default LoginButton;