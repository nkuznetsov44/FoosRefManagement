import React from 'react';
import { DataGrid, Editing, Column } from 'devextreme-react/data-grid';
import { dataStoreFactory } from '../../apiDataStore';

const Events = () => {
    const dataStore = dataStoreFactory('/api/events', 'id');

    return (
        <React.Fragment>
            <h1>Events</h1>
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
                <Column dataField={"name"} />
                <Column dataField={"type"} />
            </DataGrid>
        </React.Fragment>
    );
}

export default Events;