import React from 'react';
import DataGrid from '../../common/DataGrid';
import { Editing, Column, Lookup } from 'devextreme-react/data-grid';
import { dataStoreFactory } from '../../common/apiDataStore';
import { requireLoggedIn } from '../../permissions/requirements';
import { useAxios } from '../../auth/AxiosInstanceProvider';
import { useAuth } from '../../auth/AuthProvider';

const Events = () => {
    const { api } = useAxios();
    const { user } = useAuth();
    const dataStore = dataStoreFactory(api, '/api/events', 'id');
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
                <Editing
                    allowAdding={requireLoggedIn(user)}
                    allowDeleting={requireLoggedIn(user)}
                    allowUpdating={requireLoggedIn(user)}
                />
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