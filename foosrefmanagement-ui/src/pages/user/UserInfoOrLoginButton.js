import React from 'react';
import TelegramLoginButton from './TelegramLoginButton';

const UserInfoOrLoginButton = () => {
    const user = JSON.parse(sessionStorage.getItem('user'));

    const displayUser = (user) => {
        if (!user)
            return null;
        if (user.username)
            return `@${user.username}`;
        if (user.first_name) {
            if (user.last_name) {
                return `${user.first_name} ${user.last_name}`;
            }
            return user.first_name;
        }
        return `$<User id="${user.id}">`;
    };

    if (user) {
        return (
            <div>Logged in as {displayUser(user)}</div>
        )
    }

    return <TelegramLoginButton />;
};

export default UserInfoOrLoginButton;