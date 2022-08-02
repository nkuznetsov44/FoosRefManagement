import React from 'react';
import UsersTable from './UsersTableComponent';
import IntitationTokensTable from './InvitationTokensTableComponent';

const Users = () => {
    return (
        <React.Fragment>
            <h3>Users</h3>
            <UsersTable />
            <h3>Intitation tokens</h3>
            <IntitationTokensTable />
        </React.Fragment>
    );
};

export default Users;