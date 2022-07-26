import React from 'react';
import TelegramLoginButton from './TelegramLoginButton';

const UserInfoOrLoginButton = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    if (user) {
        return (
            <div>Logged in as @{user.username}</div>
        )
    }

    return <TelegramLoginButton />;
};

export default UserInfoOrLoginButton;