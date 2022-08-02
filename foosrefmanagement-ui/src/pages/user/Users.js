import React from 'react';
import UsersTable from './UsersTableComponent';
import IntitationTokensTable from './InvitationTokensTableComponent';
import Protected from '../../permissions/protect';
import { requireLoggedIn } from '../../permissions/requirements';

const Users = () => {
    return (
        <Protected require={requireLoggedIn}>
            <h3>Users</h3>
            <UsersTable />
            <h3>Intitation tokens</h3>
            <IntitationTokensTable />
        </Protected>
    );
};

export default Users;