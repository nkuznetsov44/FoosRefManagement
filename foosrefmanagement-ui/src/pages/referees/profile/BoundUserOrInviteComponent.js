import React from 'react';
import { Button } from 'devextreme-react/button';
import { api } from '../../../auth';
import notify from 'devextreme/ui/notify';

const IssueInvitationMessageButton = ({ refereeId }) => {
    const issueInvitationMessage = () => {
        (async () => {
            try {
                const response = await api.post('/api/invitations/issue/', {
                    refereeId: refereeId
                });
                console.log(response);
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

    // TODO: refactor display user to common functions
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
        return `id="${user.id}"`;
    };

    return (
        <React.Fragment>
            <div style={inlineBlockStyle}>
                <h4 style={{margin: "0px"}}>Связанный аккаунт Telegram:</h4>
            </div>
            <div style={inlineBlockStyle}>
                <h4 style={{margin: "0px"}}>
                    <a href="tg://user?id=123456789">{displayUser(user)}</a>
                </h4>
            </div>
        </React.Fragment>
    );
};

const BoundUserOrInviteComponent = ({ refereeId }) => {
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