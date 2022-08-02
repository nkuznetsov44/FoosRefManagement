import React from 'react';
import { useSelector } from 'react-redux';
import DataGrid from '../../common/DataGrid';
import { Editing, Column, Lookup } from 'devextreme-react/data-grid';
import { dataStoreFactory } from '../../common/apiDataStore';
import { api } from '../../auth';

const Events = (props) => {
    const dataStore = dataStoreFactory('/api/events', 'id');
    const [eventTypes, setEventTypes] = React.useState([]);

    const user = useSelector((state) => state.user.user);
    const allowTournamentsEditing = Boolean(user);

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
                {   allowTournamentsEditing &&
                    <Editing
                        mode="row"
                        allowAdding={true}
                        allowDeleting={true}
                        allowUpdating={true}
                    />
                }
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