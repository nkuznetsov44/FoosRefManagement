import React from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'devextreme-react/button';
import TelegramLoginButton from './TelegramLoginButton';
import { logout } from '../../auth';
import displayUser from './displayUser';
import { displayRefereeShort } from '../referees/displayReferee';
import { api } from '../../auth';

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
    const [referee, setReferee] = React.useState();

    React.useEffect(() => {
        if (user) {
            (async () => {
                const { data } = await api.get(`/api/refereeByUser/${user.id}`);
                setReferee(data);
            })();
        }
    }, [user]);

    if (user) {
        return (
            <React.Fragment>
                <div>{displayUser(user)}</div>
                {referee && <div>{displayRefereeShort(referee)}</div>}
                <LogoutButton />
            </React.Fragment>
        )
    }

    return <TelegramLoginButton />;
};

export default UserInfoOrLoginButton;