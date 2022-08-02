import React from 'react';
import DataGrid from '../../common/DataGrid';
import { Column } from 'devextreme-react/data-grid';
import RefereeProfileLinkRender from '../referees/RefereeProfileLinkRender';
import { api } from "../../auth";
import displayUser from './displayUser';
import { displayRefereeName } from '../referees/displayReferee';

const IntitationTokensTable = () => {
    const [invitationTokens, setInvitationTokens] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/invitations/token/');
            setInvitationTokens(data);
        })();
    }, []);

    const RefereeProfileLinkCellRender = ({ data, value }) => {
        return <RefereeProfileLinkRender referee={data.issued_for_referee} displayValue={displayRefereeName} />;
    };

    return (
        <DataGrid columnHidingEnabled={true} dataSource={invitationTokens}>
            <Column
                dataField="issued_by"
                calculateDisplayValue={(token) => displayUser(token.issued_by)}>
            </Column>
            <Column
                dataField="issued_for_referee"
                cellRender={RefereeProfileLinkCellRender}
                calculateDisplayValue={(token) => token.issued_for_referee}>
            </Column>
            <Column dataField="status" />
            <Column dataField="expires_at" />
            <Column dataField="is_expired" />
        </DataGrid>
    );
};

export default IntitationTokensTable;