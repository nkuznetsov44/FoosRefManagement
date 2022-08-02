import React from 'react';
import DataGrid from '../../../common/DataGrid';
import {
    Column, FilterRow, Paging, Lookup
} from 'devextreme-react/data-grid';
import { useAxios } from '../../../auth/AxiosInstanceProvider';

const RefereeGamesComponent = ({ refereeId }) => {
    const { api } = useAxios();

    const [games, setGames] = React.useState([]);
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
            const { data } = await api.get('/api/events');
            setEvents(data);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get(`/api/gamesByReferee/${refereeId}`);
            setGames(data);
        })();
    }, []);

    const RefereeRender = ({ value }) => {
        if (value == null) {
            return <div />;
        }
        const text = `${value.first_name} ${value.last_name}`;
        if (value.id === refereeId) {
            return <div><b>{text}</b></div>;
        } else {
            return <div>{text}</div>;
        }
    };

    const EventCellRender = ({ data }) => {
        return <div>{data && data.event && data.event.name}</div>;
    };

    if (!refereeId) {
        return <React.Fragment />;
    }
    return (
        <DataGrid dataSource={games} columnHidingEnabled={true}>
            <Paging enabled={false} />
            <FilterRow visible={true} />
            <Column
                dataField="referee"
                caption="Основной рефери"
                allowSorting={false}
                allowFiltering={false}
                cellRender={RefereeRender}>
            </Column>
            <Column
                dataField="assistant"
                caption="Ассистент"
                allowSorting={false}
                allowFiltering={false}
                cellRender={RefereeRender}>
            </Column>
            <Column
                dataField="event"
                caption="Турнир"
                allowSorting={false}
                allowFiltering={true}
                cellRender={EventCellRender}
                calculateCellValue={(rowData) => rowData && rowData.event && rowData.event.id}>
                <Lookup
                    dataSource={events}
                    displayExpr={(value) => value && value.name}
                    valueExpr={(value) => value && value.id}>
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
                dataField="category"
                caption="Категория"
                allowSorting={false}
                allowFiltering={true}>
                <Lookup
                    dataSource={gameCategories}
                    displayExpr="display"
                    valueExpr="value">
                </Lookup>
            </Column>
            <Column
                dataField="first_player"
                caption="Первая команда"
                allowSorting={false}
                allowFiltering={true}>
            </Column>
            <Column
                dataField="second_player"
                caption="Вторая команда"
                allowSorting={false}
                allowFiltering={true}>
            </Column>
            <Column
                dataField="date"
                dataType="date"
                caption="Дата"
                sortOrder="desc"
                allowSorting={true}
                allowFiltering={true}>
            </Column>
        </DataGrid>
    );
};

export default RefereeGamesComponent;