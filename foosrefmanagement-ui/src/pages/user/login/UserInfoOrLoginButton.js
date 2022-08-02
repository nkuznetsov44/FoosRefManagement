import React from 'react';
import { useSelector } from 'react-redux';
import TelegramLoginButton from './TelegramLoginButton';
import displayUser from '../displayUser';
import { displayRefereeShort } from '../../referees/displayReferee';
import { api } from '../../../auth';
import Protected from '../../../common/permissions/protect';
import { requireLoggedIn, requireNotLoggedIn } from '../../../common/permissions/requirements';

const UserInfo = () => {
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

    return (
        <React.Fragment>
            <div>{displayUser(user)}</div>
            {referee && <div>{displayRefereeShort(referee)}</div>}
        </React.Fragment>
    );
};

const UserInfoOrLoginButton = () => {
    return (
        <React.Fragment>
            <Protected require={requireLoggedIn}>
                <UserInfo />
            </Protected>
            <Protected require={requireNotLoggedIn}>
                <TelegramLoginButton />
            </Protected>
        </React.Fragment>
    );
};

export default UserInfoOrLoginButton;