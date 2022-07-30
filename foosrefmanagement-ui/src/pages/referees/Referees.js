import React from 'react';
import { useSelector } from 'react-redux';
import {
    DataGrid, Column, FilterRow, Lookup, Paging, Editing, Form
} from 'devextreme-react/data-grid';
import { SimpleItem } from 'devextreme-react/form';
import RefereeProfileLinkCellRender from './RefereeProfileCellRender';
import { dataStoreFactory } from '../../apiDataStore';
import { api } from "../../auth";

const refereeRankOrder = {
    'ASSISTANT': 0,
    'REGIONAL': 1,
    'NATIONAL': 2,
    'INTERNATIONAL': 3
};

const Referees = () => {
    const dataStore = dataStoreFactory('/api/referees', 'id');
    const [refereeRanks, setRefereeRanks] = React.useState([]);
    const [refereeCities, setRefereeCities] = React.useState([]);
    const [refereeLanguages, setRefereeLanguges] = React.useState([]);

    const user = useSelector((state) => state.user.user);
    const allowRefereeEditing = Boolean(user)/* && user.referee && user.referee.rank == 'NATIONAL'*/;  // TODO: uncomment

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

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/lookup/refereeLanguage');
            setRefereeLanguges(data);
        })();
    }, []);

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
                {   allowRefereeEditing &&
                    <Editing
                        mode="form"
                        allowAdding={true}
                        allowDeleting={true}
                        allowUpdating={true}>
                        <Form>
                            <SimpleItem dataField="first_name" />
                            <SimpleItem dataField="last_name" />
                            <SimpleItem dataField="first_name_en" />
                            <SimpleItem dataField="last_name_en" />
                            <SimpleItem dataField="rank" />
                            <SimpleItem dataField="rank_update" editorType="dxDateBox" />
                            <SimpleItem dataField="city" />
                            <SimpleItem dataField="languages" editorType="dxTagBox" />
                        </Form>
                    </Editing>
                }
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
                <Column dataField="first_name" visible={false}></Column>
                <Column dataField="last_name" visible={false}></Column>
                <Column dataField="first_name_en" visible={false}></Column>
                <Column dataField="last_name_en" visible={false}></Column>
                <Column
                    dataField="languages"
                    visible={false}>
                    <Lookup
                        dataSource={refereeLanguages}
                        displayExpr="display"
                        valueExpr="value">
                    </Lookup>
                </Column>
                <Column dataField="rank_update" dataType="date" visible={false}></Column>
            </DataGrid>
        </React.Fragment>
    );
};

export default Referees;