import React from 'react';
import { Link } from 'react-router-dom';
import {
    DataGrid, Column, FilterRow, Lookup, Paging
} from 'devextreme-react/data-grid';
import { dataStoreFactory } from '../../apiDataStore';
import { api } from "../../auth";

const refereeRankOrder = {
    'ASSISTANT': 0,
    'REGIONAL': 1,
    'NATIONAL': 2,
    'INTERNATIONAL': 3
};

const Referees = (props) => {
    const dataStore = dataStoreFactory('/api/referees', 'id');
    const [refereeRanks, setRefereeRanks] = React.useState([]);
    const [refereeCities, setRefereeCities] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/lookup/refereeRank');
            setRefereeRanks(data);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/lookup/refereeCity');
            setRefereeCities(data);
        })();
    }, []);

    const RefereeProfileLinkCellRender = ({ data, value }) => {
        return (
            <Link to={`/refereeProfile/${data.id}`}>
                {value}
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
                <Column
                    name="name"
                    caption="Рефери"
                    allowFiltering={true}
                    allowSorting={true}
                    calculateCellValue={(referee) => referee && `${referee.last_name} ${referee.first_name}`}
                    cellRender={RefereeProfileLinkCellRender}
                    sortIndex={1}
                    sortOrder="asc"
                    calculateSortValue={(referee) => referee && referee.last_name}>
                </Column>
                <Column
                    dataField="rank"
                    caption="Ранг"
                    sortIndex={0}
                    sortOrder="desc"
                    calculateSortValue={(referee) => referee && refereeRankOrder[referee.rank]}>
                    <Lookup
                        dataSource={refereeRanks}
                        displayExpr="display"
                        valueExpr="value">
                    </Lookup>
                </Column>
                <Column
                    dataField="city"
                    caption="Город">
                    <Lookup
                        dataSource={refereeCities}
                        displayExpr="display"
                        valueExpr="value">
                    </Lookup>
                </Column>
                <Column
                    name="name_en"
                    caption="Name EN"
                    allowFiltering={true}
                    allowSorting={true}
                    calculateCellValue={(referee) => referee && `${referee.first_name_en} ${referee.last_name_en}`}
                    calculateSortValue={(referee) => referee && referee.last_name_en}>
                </Column>
                <Column dataField="email" caption="Способ связи" />
                <Column dataField="languages" caption="Языки" />
            </DataGrid>
        </React.Fragment>
    );
};

export default Referees;