import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import DataGrid from '../../common/DataGrid';
import {
    Editing, FilterRow, Column, Lookup
} from 'devextreme-react/data-grid';
import SelectBox from 'devextreme-react/select-box';
import { dataStoreFactory } from '../../common/apiDataStore';
import { api } from "../../auth";
import { displayRefereeShort } from '../referees/displayReferee';

const displayEvent = (event) => {
    return event && event.name;
};

const Games = () => {
    const dataStore = dataStoreFactory('/api/games', 'id');
    const [referees, setReferees] = React.useState([]);
    const [events, setEvents] = React.useState([]);
    const [gameCategories, setGameCategories] = React.useState([]);
    const [gameStages, setGameStages] = React.useState([]);

    const user = useSelector((state) => state.user.user);
    // TODO: allow editing only user's games
    const allowGamesEditing = Boolean(user);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/lookup/gameCategory');
            setGameCategories(data);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/lookup/gameStage');
            setGameStages(data);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/referees');
            setReferees(data);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/events');
            setEvents(data);
        })();
    }, []);

    const EventCellRender = ({ data }) => {
        return <div>{displayEvent(data.event)}</div>;
    };

    const RefereeCellRender = ({ data }) => {
        return (
            <Link to={`/refereeProfile/${data.referee.id}`}>
                {displayRefereeShort(data.referee)}
            </Link>
        );
    };

    const AssistantCellRender = ({ data }) => {
        if (!data.assistant) {
            return <div />
        }
        return (
            <Link to={`/refereeProfile/${data.assistant.id}`}>
                {displayRefereeShort(data.assistant)}
            </Link>
        );
    };

    const RefereeEditorRender = (cell) => {
        return (
            <SelectBox
                defaultValue={cell.value}
                {...cell.column.lookup}
                onValueChanged={({ value }) => cell.setValue(value)}
                itemRender={displayRefereeShort}
                searchEnabled={true}
                searchMode="contains"
                searchExpr={["first_name", "last_name"]}
            />
        );
    };

    return (
        <React.Fragment>
            <h1>Игры</h1>
            <DataGrid columnHidingEnabled={true} dataSource={dataStore}>
                {   allowGamesEditing &&
                    <Editing
                        mode="form"
                        allowAdding={true}
                        allowDeleting={true}
                        allowUpdating={true}>
                    </Editing>
                }
                <FilterRow visible={true} />
                <Column
                    dataField="date"
                    dataType="date"
                    caption="Дата"
                    sortOrder="desc">
                </Column>
                <Column
                    dataField="category"
                    caption="Кат."
                    allowSorting={false}
                    allowFiltering={true}>
                    <Lookup
                        dataSource={gameCategories}
                        displayExpr="display"
                        valueExpr="value">
                    </Lookup>
                </Column>
                <Column
                    dataField="stage"
                    caption="Стадия"
                    allowSorting={false}
                    allowFiltering={true}>
                    <Lookup
                        dataSource={gameStages}
                        displayExpr="display"
                        valueExpr="value">
                    </Lookup>
                </Column>
                <Column
                    dataField="referee"
                    caption="Основной рефери"
                    allowSorting={false}
                    allowFiltering={true}
                    alignment="left"
                    calculateCellValue={(rowData) => rowData && rowData.referee && rowData.referee.id}  // used for filtering
                    cellRender={RefereeCellRender}
                    editCellRender={RefereeEditorRender}>
                    <Lookup
                        dataSource={referees}
                        displayExpr={displayRefereeShort}
                        valueExpr={(value) => value && value.id}>
                    </Lookup>
                </Column>
                <Column
                    dataField="assistant"
                    caption="Ассистент"
                    allowSorting={false}
                    allowFiltering={true}
                    alignment="left"
                    calculateCellValue={(rowData) => rowData && rowData.assistant && rowData.assistant.id}
                    cellRender={AssistantCellRender}
                    editCellRender={RefereeEditorRender}>
                    <Lookup
                        dataSource={referees}
                        displayExpr={displayRefereeShort}
                        valueExpr={(value) => value && value.id}>
                    </Lookup>
                </Column>
                <Column
                    dataField={"event"}
                    caption={"Турнир"}
                    allowSorting={false}
                    allowFiltering={true}
                    calculateCellValue={(rowData) => rowData && rowData.event && rowData.event.id}
                    cellRender={EventCellRender}>
                    <Lookup
                        dataSource={events}
                        displayExpr={displayEvent}
                        valueExpr={(value) => value && value.id}>
                    </Lookup>
                </Column>
                <Column
                    dataField="first_player"
                    caption="Команда 1"
                    allowSorting={false}
                    allowFiltering={true}>
                </Column>
                <Column
                    dataField="second_player"
                    caption="Команда 2"
                    allowSorting={false}
                    allowFiltering={true}>
                </Column>
            </DataGrid>
        </React.Fragment>
    );
};

export default Games;