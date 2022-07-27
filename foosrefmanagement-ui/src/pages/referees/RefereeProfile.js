import React from 'react';
import { useParams } from 'react-router-dom';
import {
    DataGrid, Column, FilterRow, Paging, Lookup
} from 'devextreme-react/data-grid';
import { Button } from 'devextreme-react/button';
import { api } from '../../auth';
import notify from 'devextreme/ui/notify';

const IssueInvitationMessageButton = (props) => {
    const issueInvitationMessage = () => {
        (async () => {
            const { data } = await api.post('/api/invitations/issue/', {
                refereeId: props.refereeId
            });
            //console.log(data);
            notify('Приглашение отправлено в Telegram', 'success', 5000);
        })();
    };

    return (
        <Button
            width={120}
            text="Отправить ссылку-приглашение"
            type="normal"
            stylingMode="contained"
            onClick={issueInvitationMessage}
        />
    )
}

const RefereeCard = (props) => {
    const inlineBlockStyle = {
        display: "inline-block",
        verticalAlign: "top",
        margin: "0px 10px 10px 0px"
    };

    const user = JSON.parse(sessionStorage.getItem('user'));
    // TODO: allow send invitations only for referees with unbound telegram accounts
    const allowSendInvitations = Boolean(user);

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
                            <CardTextElement text="Дата сдачи экзамена:" />
                        </div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text={`${props.referee.rank_update}`} />
                        </div>
                    </div>
                    <div>
                        <div style={inlineBlockStyle}>
                            <IssueInvitationMessageButton refereeId={props.referee.id} />
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

    const RefereeRender = ({ value }) => {
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

    const EventCellRender = ({ data }) => {
        return <div>{data && data.event && data.event.name}</div>;
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
                columnHidingEnabled={true}
                columnAutoWidth={true}
                rowAlternationEnabled={true}>
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
        </React.Fragment>
    );
};

export default RefereeProfile;
