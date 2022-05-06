import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import {
    DataGrid, Editing, Column, Lookup
} from 'devextreme-react/data-grid';
import SelectBox from 'devextreme-react/select-box';
import { dataStoreFactory } from '../../apiDataStore';
import { api } from "../../auth";

const displayReferee = (referee) => {
    return referee && `${referee.first_name} ${referee.last_name} (${referee.rank})`;
};

const displayEvent = (event) => {
    return event && event.name;
};

const Games = () => {
    const dataStore = dataStoreFactory('/api/games', 'id');
    const [referees, setReferees] = React.useState([]);
    const [events, setEvents] = React.useState([]);
    const [gameCategories, setGameCategories] = React.useState([]);
    const [gameStages, setGameStages] = React.useState([]);

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
            const { data } = await axios.get('/api/referees');
            setReferees(data);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get('/api/events');
            setEvents(data);
        })();
    }, []);

    const EventCellRender = ({ data }) => {
        return <div>{displayEvent(data.event)}</div>;
    };

    const RefereeCellRender = ({ data }) => {
        return (
            <Link to={`/refereeProfile/${data.referee.id}`}>
                {displayReferee(data.referee)}
            </Link>
        );
    };

    const AssistantCellRender = ({ data }) => {
        return (
            <Link to={`/refereeProfile/${data.assistant.id}`}>
                {displayReferee(data.assistant)}
            </Link>
        );
    };

    const refereeEditorRender = (cell) => {
        return (
            <SelectBox
                defaultValue={cell.value}
                {...cell.column.lookup}
                onValueChanged={({ value }) => cell.setValue(value)}
                itemRender={displayReferee}
                searchEnabled={true}
                searchMode="contains"
                searchExpr={["first_name", "last_name"]}
            />
        );
    };

    return (
        <React.Fragment>
            <h1>Игры</h1>
            <DataGrid
                columnHidingEnabled={true}
                dataSource={dataStore}
                showBorders={true}
                columnAutoWidth={true}
                rowAlternationEnabled={true}>
                <Editing
                    mode="row"
                    allowAdding={true}
                    allowDeleting={true}
                    allowUpdating={false}
                />
                <Column
                    dataField="date"
                    dataType="date"
                    caption="Дата"
                    sortOrder="desc">
                </Column>
                <Column dataField="first_player" caption="Первая команда" />
                <Column dataField="second_player" caption="Вторая команда" />
                <Column
                    dataField="referee"
                    caption="Основной рефери"
                    cellRender={RefereeCellRender}
                    editCellRender={refereeEditorRender}>
                    <Lookup
                        dataSource={referees}
                        displayExpr={displayReferee}>
                    </Lookup>
                </Column>
                <Column
                    dataField="assistant"
                    caption="Ассистент"
                    cellRender={AssistantCellRender}
                    editCellRender={refereeEditorRender}>
                    <Lookup
                        dataSource={referees}
                        displayExpr={displayReferee}>
                    </Lookup>
                </Column>
                <Column
                    dataField={"event"}
                    caption={"Турнир"}
                    cellRender={EventCellRender}>
                    <Lookup
                        dataSource={events}
                        displayExpr={displayEvent}>
                    </Lookup>
                </Column>
                <Column dataField="category" caption="Категория">
                    <Lookup
                        dataSource={gameCategories}
                        displayExpr="display"
                        valueExpr="value">
                    </Lookup>
                </Column>
                <Column dataField="stage" caption="Стадия">
                    <Lookup
                        dataSource={gameStages}
                        displayExpr="display"
                        valueExpr="value">
                    </Lookup>
                </Column>
            </DataGrid>
        </React.Fragment>
    );
};

export default Games;