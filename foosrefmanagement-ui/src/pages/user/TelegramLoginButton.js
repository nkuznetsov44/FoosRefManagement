import React from 'react';
import { useNavigate } from "react-router-dom";
import notify from 'devextreme/ui/notify';
import TelegramLoginButton from 'react-telegram-login';
import { login } from '../../auth';

const LoginButton = () => {
    const navigate = useNavigate();

    const handleTelegramResponse = (dataOnauth) => {
        (async () => {
            try {
                await login(dataOnauth);
            }
            catch(e) {
                //TODO: Display "detail" from error response
                notify('Login failed', 'error', 5000);
                console.log(e);
            }
        })();
        navigate('/', { replace: true });
    };

    return (
        <TelegramLoginButton
            dataOnauth={handleTelegramResponse}
            botName="FoosRefManagementBot"  // TODO: to frontend conf
        />
    )
};

export default LoginButton;