import React from 'react';
import { DataGrid, Editing, Column } from 'devextreme-react/data-grid';
import { dataStoreFactory } from '../../apiDataStore';

const Referees = () => {
    const dataStore = dataStoreFactory('/api/referees', 'id');

    return (
        <React.Fragment>
            <h1>Referees</h1>
            <DataGrid
                dataSource={dataStore}
                showBorders={true}
                columnAutoWidth={true}>
                <Editing
                    mode="row"
                    allowAdding={true}
                    allowDeleting={true}
                    allowUpdating={true}
                />
                <Column dataField={"first_name"} />
                <Column dataField={"last_name"} />
                <Column dataField={"first_name_en"} />
                <Column dataField={"last_name_en"} />
                <Column dataField={"email"} />
                <Column dataField={"languages"} />
                <Column dataField={"rank"} />
            </DataGrid>
        </React.Fragment>
    );
}

export default Referees;