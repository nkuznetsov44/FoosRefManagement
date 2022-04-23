import React from 'react';
import { useLocation } from 'react-router-dom'
import { DataGrid, Column } from 'devextreme-react/data-grid';
import { api } from '../../auth';

const RefereeCard = (props) => {
    const style = {
        width: props.width
    };

    return (
        <div style={style}>
            <h2>{`${props.referee.first_name} ${props.referee.last_name}`}</h2>
            <div className="dx-fieldset" >
                <div className="dx-field">
                    <div className="dx-field-label">Ранг:</div>
                    <div className="dx-field-label">{props.referee.rank}</div>
                </div>
                <div className="dx-field">
                <div className="dx-field-label">Город:</div>
                    <div className="dx-field-label">{props.referee.city}</div>
                </div>
                <div className="dx-field">
                    <div className="dx-field-label">Всего игр:</div>
                    <div className="dx-field-label">{`${props.games.length}`}</div>
                </div>
            </div>
        </div>
    );
};

const RefereeProfile = () => {
    const location = useLocation();
    const { referee } = location.state;
    const [games, setGames] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/gamesByReferee', {
                params: {
                    id: referee.id
                }
            });
            setGames(data);
        })();
    }, [referee])

    const refRender = ({ value }) => {
        if (value == null) {
            return <div />;
        }
        const text = `${value.first_name} ${value.last_name}`;
        if (value.id == referee.id) {
            return <div><b>{text}</b></div>;
        } else {
            return <div>{text}</div>;
        }
    };

    const eventRender = ({ value }) => {
        return <div>{value && value.name}</div>;
    };

    return (
        <React.Fragment>
            <RefereeCard
                referee={referee}
                games={games}
                width="300px">
            </RefereeCard>
            <DataGrid
                dataSource={games}
                showBorders={true}
                columnAutoWidth={true}>
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
                <Column dataField="first_player" caption="Первая команда" />
                <Column dataField="second_player" caption="Вторая команда" />
                <Column dataField="date" dataType="date" caption="Дата" />
            </DataGrid>
        </React.Fragment>
    );
};

export default RefereeProfile;