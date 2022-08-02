import React from 'react';
import notify from 'devextreme/ui/notify';
import TelegramLoginButton from 'react-telegram-login';
import settings from '../../../appSettings';
import { useAuth } from '../../../auth/auth';

const LoginButton = () => {
    const { login } = useAuth();

    const handleTelegramResponse = (dataOnauth) => {
        (async () => {
            try {
                await login(dataOnauth);
            }
            catch(e) {
                console.error(e);
                notify('Login failed', 'error', 5000);
            }
        })();
    };

    return (
        <TelegramLoginButton
            dataOnauth={handleTelegramResponse}
            botName={settings.telegramBotName}
            buttonSize="medium"
        />
    )
};

export default LoginButton;