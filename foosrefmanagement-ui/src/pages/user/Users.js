import React from 'react';
import { useSelector } from 'react-redux';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import RefereeProfileLinkRender from '../referees/RefereeProfileLinkRender';
import { api } from "../../auth";
import displayUser from './displayUser';

const Users = () => {
    const [users, setUsers] = React.useState([]);
    const [invitationTokens, setInvitationTokens] = React.useState([]);

    const user = useSelector((state) => state.user.user);
    const allowSeeUsers = Boolean(user);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/auth/user/');
            setUsers(data);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/invitations/token/');
            setInvitationTokens(data);
        })();
    }, []);

    const RefereeProfileLinkCellRender = ({ data, value }) => {
        return data.referee && <RefereeProfileLinkRender referee={data.referee} />;
    };

    const IssuedForRefereeProfileLinkCellRender = ({ data, value }) => {
        return <RefereeProfileLinkRender referee={data.issued_for_referee} />;
    };

    if (!allowSeeUsers) {
        return <React.Fragment />
    }
    return (
        <React.Fragment>
            <h3>Users</h3>
            <DataGrid
                columnHidingEnabled={true}
                showBorders={true}
                columnAutoWidth={true}
                rowAlternationEnabled={true}
                dataSource={users}>
                <Column dataField="telegram_user_id" />
                <Column dataField="username" />
                <Column dataField="first_name" />
                <Column dataField="last_name" />
                <Column
                    dataField="referee"
                    cellRender={RefereeProfileLinkCellRender}
                    calculateDisplayValue={(user) => user.referee}>
                </Column>
            </DataGrid>
            <h3>Intitation tokens</h3>
            <DataGrid
                columnHidingEnabled={true}
                showBorders={true}
                columnAutoWidth={true}
                rowAlternationEnabled={true}
                dataSource={invitationTokens}>
                <Column
                    dataField="issued_by"
                    calculateDisplayValue={(token) => displayUser(token.issued_by)}>
                </Column>
                <Column
                    dataField="issued_for_referee"
                    cellRender={IssuedForRefereeProfileLinkCellRender}
                    calculateDisplayValue={(token) => token.issued_for_referee}>
                </Column>
                <Column dataField="status" />
                <Column dataField="expires_at" />
                <Column dataField="is_expired" />
            </DataGrid>
        </React.Fragment>
    );
};

export default Users;