import React from 'react';
import DataGrid from '../../common/DataGrid';
import { Column } from 'devextreme-react/data-grid';
import RefereeProfileLinkRender from '../referees/RefereeProfileLinkRender';
import { displayRefereeName } from '../referees/displayReferee';
import { useAxios } from '../../auth/AxiosInstanceProvider';

const UsersTable = () => {
    const { api } = useAxios();
    const [users, setUsers] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/auth/user/');
            setUsers(data);
        })();
    }, []);

    const RefereeProfileLinkCellRender = ({ data, value }) => {
        return (
            data.referee &&
            <RefereeProfileLinkRender referee={data.referee} displayValue={displayRefereeName} />
        );
    };

    return (
        <DataGrid columnHidingEnabled={true} dataSource={users}>
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
    );
};

export default UsersTable;