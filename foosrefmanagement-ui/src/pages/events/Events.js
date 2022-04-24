import React from 'react';
import { DataGrid, Editing, Column, Lookup } from 'devextreme-react/data-grid';
import { dataStoreFactory } from '../../apiDataStore';


const eventTypes = [
    { code: 'MASTERS', displayName: 'Masters' },
    { code: 'PRO_TOUR', displayName: 'Pro Tour'},
    { code: 'RUSSIAN_CUP_STAGE', displayName: 'Этап чемпионата России'},
    { code: 'RUSSIAN_CUP_FINAL', displayName: 'Финал чемпионата России'},
    { code: 'LOCAL_TOURNAMENT', displayName: 'Локальный турнир'},
    { code: 'TEAMS', displayName: 'Лига'}
]


const Events = () => {
    const dataStore = dataStoreFactory('/api/events', 'id');

    return (
        <React.Fragment>
            <h1>Турниры</h1>
            <DataGrid
                dataSource={dataStore}
                showBorders={true}
                columnAutoWidth={true}
                rowAlternationEnabled={true}>
                <Editing
                    mode="row"
                    allowAdding={true}
                    allowDeleting={true}
                    allowUpdating={true}
                />
                <Column dataField="name" caption="Название" />
                <Column
                    dataField="type"
                    caption="Тип">
                    <Lookup
                        dataSource={eventTypes}
                        displayExpr="displayName"
                        valueExpr="code">
                    </Lookup>
                </Column>
            </DataGrid>
        </React.Fragment>
    );
}

export default Events;