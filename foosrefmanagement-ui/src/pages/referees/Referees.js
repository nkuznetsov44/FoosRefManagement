import React from 'react';
import { DataGrid, Column } from 'devextreme-react/data-grid';
import { dataStoreFactory } from '../../apiDataStore';

const Referees = () => {
    const dataStore = dataStoreFactory('/api/referees', 'id');

    return (
        <React.Fragment>
            <h1>Рефери</h1>
            <DataGrid
                dataSource={dataStore}
                showBorders={true}
                columnAutoWidth={true}>
                <Column dataField={"first_name"} caption={"Имя"} />
                <Column dataField={"last_name"} caption={"Фамилия"} />
                <Column dataField={"first_name_en"} caption={"First name"} />
                <Column dataField={"last_name_en"} caption={"Last name"} />
                <Column dataField={"email"} caption={"Способ связи"} />
                <Column dataField={"languages"} caption={"Языки"} />
                <Column dataField={"city"} caption={"Город"} />
                <Column dataField={"rank"} caption={"Ранг"} />
            </DataGrid>
        </React.Fragment>
    );
}

export default Referees;