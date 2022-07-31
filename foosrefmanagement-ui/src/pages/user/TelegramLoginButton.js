import React from 'react';
import notify from 'devextreme/ui/notify';
import TelegramLoginButton from 'react-telegram-login';
import { login } from '../../auth';
import settings from '../../appSettings';

const LoginButton = () => {
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