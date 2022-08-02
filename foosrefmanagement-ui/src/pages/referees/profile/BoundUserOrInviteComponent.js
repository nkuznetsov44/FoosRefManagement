import React from 'react';
import { Button } from 'devextreme-react/button';
import displayUser from '../../user/displayUser';
import notify from 'devextreme/ui/notify';
import { useAxios } from '../../../auth/AxiosInstanceProvider';

const IssueInvitationMessageButton = ({ refereeId }) => {
    const { api } = useAxios();

    const issueInvitationMessage = () => {
        (async () => {
            try {
                await api.post('/api/invitations/issue/', {
                    refereeId: refereeId
                });
                notify('Приглашение отправлено в Telegram', 'success', 5000);
            } catch (err) {
                console.log(err);
                notify('Ошибка отправки приглашения', 'error', 5000);
            }
        })();
    };

    return (
        <Button
            width={200}
            text="Отправить приглашение"
            type="normal"
            stylingMode="contained"
            onClick={issueInvitationMessage}
        />
    );
};

const BoundUserComponent = ({ user }) => {
    const inlineBlockStyle = {
        display: "inline-block",
        verticalAlign: "top",
        margin: "0px 10px 10px 0px"
    };

    return (
        <React.Fragment>
            <div style={inlineBlockStyle}>
                <h4 style={{margin: "0px"}}>Связанный аккаунт Telegram:</h4>
            </div>
            <div style={inlineBlockStyle}>
                <h4 style={{margin: "0px"}}>
                    <a href={`tg://user?id=${user.id}`}>{displayUser(user)}</a>
                </h4>
            </div>
        </React.Fragment>
    );
};

const BoundUserOrInviteComponent = ({ refereeId }) => {
    const { api } = useAxios();

    const [boundUser, setBoundUser] = React.useState();

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get(`/api/refereeBoundUser/${refereeId}`);
            setBoundUser(data);
        })();
    }, []);

    if (boundUser) {
        return <BoundUserComponent user={boundUser} />;
    }
    return <IssueInvitationMessageButton refereeId={refereeId} />;
};

export default BoundUserOrInviteComponent;