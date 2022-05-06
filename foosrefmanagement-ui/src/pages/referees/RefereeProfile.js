import React from 'react';
import { useParams } from 'react-router-dom';
import {
    DataGrid, Column, FilterRow, SearchPanel, Paging
} from 'devextreme-react/data-grid';
import { api } from '../../auth';

const RefereeCard = (props) => {
    const inlineBlockStyle = {
        display: "inline-block",
        verticalAlign: "top",
        margin: "0px 10px 10px 0px"
    };

    const CardTextElement = (props) => {
        const style = {
            margin: "0px"
        };

        return (
            <h4 style={style}>{props.text}</h4>
        );
    };

    const getProfilePhotoUrl = (referee) => {
        if (referee.photo == null) {
            return '/static-media/unknown_referee.png';
        }
        return `/media/${referee.photo}`
    };

    return (
        <React.Fragment>
            <h2>{`${props.referee.first_name} ${props.referee.last_name}`}</h2>
            <div>
                <div style={inlineBlockStyle}>
                    <img
                        height="240px" width="180px"
                        src={getProfilePhotoUrl(props.referee)} 
                    />
                </div>
                <div style={inlineBlockStyle}>
                    <div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text="Ранг:" />
                        </div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text={props.referee.rank} />
                        </div>
                    </div>
                    <div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text="Город:" />
                        </div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text={props.referee.city} />
                        </div>
                    </div>
                    <div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text="Всего игр:" />
                        </div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text={`${props.games.length}`} />
                        </div>
                    </div>
                    <div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text="Когда стал рефери:" />
                        </div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text={`${props.referee.rank_update}`} />
                        </div>
                    </div>
                </div>
            </div>
        </React.Fragment>
    );
};

const RefereeProfile = () => {
    const { id } = useParams();
    const [referee, setReferee] = React.useState();
    const [games, setGames] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get(`/api/referees/${id}`);
            setReferee(data);
        })();
    }, [id]);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get(`/api/gamesByReferee/${id}`);
            setGames(data);
        })();
    }, [id]);

    const refRender = ({ value }) => {
        if (value == null) {
            return <div />;
        }
        const text = `${value.first_name} ${value.last_name}`;
        if (value.id === referee.id) {
            return <div><b>{text}</b></div>;
        } else {
            return <div>{text}</div>;
        }
    };

    const eventRender = ({ value }) => {
        return <div>{value && value.name}</div>;
    };

    if (!referee) {
        return <React.Fragment />
    }

    return (
        <React.Fragment>
            <RefereeCard
                referee={referee}
                games={games}>
            </RefereeCard>
            <DataGrid
                dataSource={games}
                showBorders={true}
                columnAutoWidth={true}
                rowAlternationEnabled={true}>
                <Paging enabled={false} />
                <FilterRow visible={true} />
                <SearchPanel visible={true}
                    width={240}
                    placeholder="Найти..."
                />
                <Column
                    dataField="referee"
                    caption="Основной рефери"
                    cellRender={refRender}>
                </Column>
                <Column
                    dataField="assistant"
                    caption="Ассистент"
                    cellRender={refRender}>
                </Column>
                <Column
                    dataField="event"
                    caption="Турнир"
                    cellRender={eventRender}>
                </Column>
                <Column
                    dataField="stage"
                    caption="Стадия">
                </Column>
                <Column
                    dataField="category"
                    caption="Категория">
                </Column>
                <Column dataField="first_player" caption="Первая команда" />
                <Column dataField="second_player" caption="Вторая команда" />
                <Column dataField="date" dataType="date" caption="Дата" />
            </DataGrid>
        </React.Fragment>
    );
};

export default RefereeProfile;
