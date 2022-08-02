import React from 'react';
import DataGrid from '../../common/DataGrid';
import { Editing, Column, Lookup } from 'devextreme-react/data-grid';
import { dataStoreFactory } from '../../common/apiDataStore';
import { api } from '../../auth/auth';
import Protected from '../../permissions/protect';
import { requireLoggedIn } from '../../permissions/requirements';

const Events = () => {
    const dataStore = dataStoreFactory('/api/events', 'id');
    const [eventTypes, setEventTypes] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/lookup/eventType');
            setEventTypes(data);
        })();
    }, []);

    return (
        <React.Fragment>
            <h1>Турниры</h1>
            <DataGrid dataSource={dataStore}>
                <Protected require={requireLoggedIn}>
                    <Editing
                        mode="row"
                        allowAdding={true}
                        allowDeleting={true}
                        allowUpdating={true}
                    />
                </Protected>
                <Column dataField="name" caption="Название" />
                <Column
                    dataField="type"
                    caption="Тип">
                    <Lookup
                        dataSource={eventTypes}
                        displayExpr="display"
                        valueExpr="value">
                    </Lookup>
                </Column>
            </DataGrid>
        </React.Fragment>
    );
};

export default Events;