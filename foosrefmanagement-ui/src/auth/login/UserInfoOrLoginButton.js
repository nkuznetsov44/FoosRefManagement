import React from 'react';
import TelegramLoginButton from './TelegramLoginButton';
import displayUser from '../../common/displayUser';
import { displayRefereeWithRankShort } from '../../common/displayReferee';
import { useAuth } from '../AuthProvider';
import { useAxios } from '../AxiosInstanceProvider';
import Protected from '../../permissions/protect';
import { requireLoggedIn, requireNotLoggedIn } from '../../permissions/requirements';

const UserInfo = () => {
    const { api } = useAxios();
    const { user } = useAuth();
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
            {referee && <div>{displayRefereeWithRankShort(referee)}</div>}
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