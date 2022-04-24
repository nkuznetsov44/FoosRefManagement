import React from 'react';
import { Link } from 'react-router-dom';
import {
    DataGrid, Column, FilterRow, HeaderFilter, SearchPanel
} from 'devextreme-react/data-grid';
import { dataStoreFactory } from '../../apiDataStore';

const Referees = () => {
    const dataStore = dataStoreFactory('/api/referees', 'id');

    const RefereeProfileLinkCellRender = (cellData) => {
        return (
            <Link to="/refereeProfile" state={{ referee: cellData.data }}>
                {cellData.value}
            </Link>
        );
    };

    return (
        <React.Fragment>
            <h1>Рефери</h1>
            <DataGrid
                dataSource={dataStore}
                showBorders={true}
                columnAutoWidth={true}
                rowAlternationEnabled={true}
                hoverStateEnabled={true}>
                <FilterRow visible={true} />
                <SearchPanel visible={true}
                    width={240}
                    placeholder="Найти..."
                />
                <Column
                    dataField={"first_name"}
                    caption={"Имя"}
                    cellRender={RefereeProfileLinkCellRender}>
                </Column>
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