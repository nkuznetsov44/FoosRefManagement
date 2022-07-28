import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'devextreme-react/button';
import TelegramLoginButton from './TelegramLoginButton';
import { logout } from '../../auth';

const LogoutButton = () => {
    return (
        <Button
            width={120}
            text="Logout"
            type="normal"
            stylingMode="contained"
            onClick={logout}
        />
    );
};

const UserInfoOrLoginButton = () => {
    const user = useSelector((state) => state.user.user);

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
            <React.Fragment>
                <div>Logged in as {displayUser(user)}</div>
                <LogoutButton />
            </React.Fragment>
        )
    }

    return <TelegramLoginButton />;
};

export default UserInfoOrLoginButton;