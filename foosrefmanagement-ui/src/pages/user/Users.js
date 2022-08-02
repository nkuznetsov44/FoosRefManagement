import React from 'react';
import { useSelector } from 'react-redux';
import UsersTable from './UsersTableComponent';
import IntitationTokensTable from './InvitationTokensTableComponent';

const Users = () => {
    const user = useSelector((state) => state.user.user);
    const allowSeeUsers = Boolean(user);

    if (!allowSeeUsers) {
        return <React.Fragment />
    }
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