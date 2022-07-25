import React from 'react';
import TelegramLoginButton from 'react-telegram-login';
 
const LoginButton = (props) => {
    return (
        <TelegramLoginButton dataOnauth={props.onAuth} botName="FoosRefManagementBot" />  // TODO: to frontend conf
    )
};

export default LoginButton;