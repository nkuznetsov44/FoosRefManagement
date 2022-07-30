import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'devextreme-react/button';
import TelegramLoginButton from './TelegramLoginButton';
import { logout } from '../../auth';
import displayUser from './displayUser';

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

    if (user) {
        return (
            <React.Fragment>
                <div>Logged in as {displayUser(user)}</div>
                {   user.referee && 
                    <div>{`${user.referee.first_name} ${user.referee.last_name} (${user.referee.rank})`}</div>
                }
                <LogoutButton />
            </React.Fragment>
        )
    }

    return <TelegramLoginButton />;
};

export default UserInfoOrLoginButton;