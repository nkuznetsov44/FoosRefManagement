import React from 'react';
import { Link } from 'react-router-dom';
import {
    DataGrid, Column, FilterRow, SearchPanel, Paging
} from 'devextreme-react/data-grid';
import { dataStoreFactory } from '../../apiDataStore';


const refereeRanks = {
    'Assistant': 0,
    'Regional': 1,
    'National': 2,
    'International': 3
};


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
                columnHidingEnabled={true}
                rowAlternationEnabled={true}
                hoverStateEnabled={true}>
                <Paging enabled={false} />
                <FilterRow visible={true} />
                <SearchPanel visible={true}
                    width={240}
                    placeholder="Найти..."
                />
                <Column
                    name="name"
                    caption="Рефери"
                    calculateCellValue={(referee) => {
                        return `${referee.last_name} ${referee.first_name}`
                    }}
                    cellRender={RefereeProfileLinkCellRender}
                    sortIndex={1}
                    sortOrder="desc"
                    calculateSortValue={(referee) => {
                        return referee.last_name
                    }}>
                </Column>
                <Column dataField="city" caption="Город" />
                <Column
                    dataField="rank"
                    caption="Ранг"
                    sortIndex={0}
                    sortOrder="desc"
                    calculateSortValue={(rank) => { return refereeRanks[rank] }}>
                </Column>
                <Column
                    name="name_en"
                    caption="Name EN"
                    calculateCellValue={(referee) => {
                        return `${referee.first_name_en} ${referee.last_name_en}`
                    }}
                    calculateSortValue={(referee) => {
                        return referee.last_name_en
                    }}>
                </Column>
                <Column dataField="email" caption="Способ связи" />
                <Column dataField="languages" caption="Языки" />
            </DataGrid>
        </React.Fragment>
    );
};

export default Referees;