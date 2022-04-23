import React from 'react';
import axios from 'axios';
import { DataGrid, Editing, Column, Lookup } from 'devextreme-react/data-grid';
import SelectBox from 'devextreme-react/select-box';
import { dataStoreFactory } from '../../apiDataStore';

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

    const EventCellRender = ({ value }) => {
        return <div>{displayEvent(value)}</div>;
    };

    const RefereeCellRender = ({ value }) => {
        return <div>{displayReferee(value)}</div>
    };

    const refereeEditorRender = (cell) => {
        return (
            <SelectBox
                defaultValue={cell.value}
                {...cell.column.lookup}
                onValueChanged={({ value }) => cell.setValue(value)}
                itemRender={displayReferee}
            />
        );
    };

    return (
        <React.Fragment>
            <h1>Игры</h1>
            <DataGrid
                dataSource={dataStore}
                showBorders={true}
                columnAutoWidth={true}>
                <Editing
                    mode="row"
                    allowAdding={true}
                    allowDeleting={true}
                    allowUpdating={false}
                />
                <Column
                    dataField={"event"}
                    caption={"Турнир"}
                    cellRender={EventCellRender}>
                    <Lookup
                        dataSource={events}
                        displayExpr={displayEvent}>
                    </Lookup>
                </Column>
                <Column dataField={"first_player"} caption="Первая команда" />
                <Column dataField={"second_player"} caption="Вторая команда" />
                <Column dataField={"date"} dataType={"date"} caption="Дата" />
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
                    dataField={"assistant"}
                    caption="Ассистент"
                    cellRender={RefereeCellRender}
                    editCellRender={refereeEditorRender}>
                    <Lookup
                        dataSource={referees}
                        displayExpr={displayReferee}>
                    </Lookup>
                </Column>
            </DataGrid>
        </React.Fragment>
    );
}

export default Games;