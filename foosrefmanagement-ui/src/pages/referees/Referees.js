import React from 'react';
import { useSelector } from 'react-redux';
import DataGrid from '../../common/DataGrid';
import {
    Column, FilterRow, Lookup, Paging, Editing, Form
} from 'devextreme-react/data-grid';
import { SimpleItem } from 'devextreme-react/form';
import RefereeProfileLinkRender from './RefereeProfileLinkRender';
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
    // TODO: now user info from /api/auth/token doesnt have bound referee info.
    // Need permission management system bound to user.
    const allowRefereeEditing = Boolean(user)/* && user.referee && user.referee.rank == 'NATIONAL'*/;

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

    const RefereeProfileLinkCellRender = ({ data, value }) => {
        return <RefereeProfileLinkRender referee={data}/>;
    };

    return (
        <React.Fragment>
            <h1>Рефери</h1>
            <DataGrid
                dataSource={dataStore}
                columnHidingEnabled={true}
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
                            <SimpleItem dataField="is_active" />
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
                    cellRender={RefereeProfileLinkCellRender}
                    sortIndex={2}
                    sortOrder="asc"
                    calculateSortValue={(referee) => referee && referee.last_name}
                    calculateCellValue={(referee) => `${referee.first_name} ${referee.last_name}`}>
                </Column>
                <Column
                    dataField="rank"
                    caption="Ранг"
                    sortIndex={1}
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
                <Column dataField="first_name" caption="Имя" visible={false}></Column>
                <Column dataField="last_name" caption="Фамилия" visible={false}></Column>
                <Column dataField="first_name_en" caption="Имя (EN)" visible={false}></Column>
                <Column dataField="last_name_en" caption="Фамилия (EN)" visible={false}></Column>
                <Column
                    dataField="languages"
                    caption="Языки"
                    visible={false}>
                    <Lookup
                        dataSource={refereeLanguages}
                        displayExpr="display"
                        valueExpr="value">
                    </Lookup>
                </Column>
                <Column
                    dataField="rank_update"
                    caption="Дата сдачи экзамена"
                    dataType="date"
                    visible={false}>
                </Column>
                <Column
                    dataField="is_active"
                    caption="Активный"
                    visible={false}
                    sortIndex={0}
                    sortOrder="desc">
                </Column>
            </DataGrid>
        </React.Fragment>
    );
};

export default Referees;