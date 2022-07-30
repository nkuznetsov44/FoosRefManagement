import React from 'react';
import { useSelector } from 'react-redux';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import RefereeProfileLinkCellRender from '../referees/RefereeProfileCellRender';
import { api } from "../../auth";

const Users = () => {
    const [users, setUsers] = React.useState([]);

    const user = useSelector((state) => state.user.user);
    const allowSeeUsers = Boolean(user);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/auth/user/');
            setUsers(data);
        })();
    }, []);

    if (!allowSeeUsers) {
        return <React.Fragment />
    }
    return (
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
            <Column dataField="referee" cellRender={RefereeProfileLinkCellRender} />
        </DataGrid>
    );
};

export default Users;