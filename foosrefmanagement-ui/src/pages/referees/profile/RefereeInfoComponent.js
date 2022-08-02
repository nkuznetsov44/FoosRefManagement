import React from 'react';
import BoundUserOrInviteComponent from './BoundUserOrInviteComponent';
import { api } from '../../../auth/auth';
import Protected from '../../../permissions/protect';
import { requireLoggedIn } from '../../../permissions/requirements';

const RefereeInfoComponent = ({ referee }) => {
    const inlineBlockStyle = {
        display: "inline-block",
        verticalAlign: "top",
        margin: "0px 10px 10px 0px"
    };

    const badgeUrl = {
        'ASSISTANT': '/static-media/assistant-referee-badge.jpg',
        'REGIONAL': '/static-media/regional-referee-badge.jpg',
        'NATIONAL': '/static-media/national-referee-badge.jpg',
        'INTERNATIONAL': '/static-media/international-referee-badge.jpg',
    }

    const [cities, setCities] = React.useState({});
    const [ranks, setRanks] = React.useState({});

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/lookup/refereeCity');
            const cityLookup = Object.assign({}, ...data.map((city) => ({[city.value]: city.display})));
            setCities(cityLookup);
        })();
    }, []);

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get('/api/lookup/refereeRank');
            const rankLookup = Object.assign({}, ...data.map((rank) => ({[rank.value]: rank.display})));
            setRanks(rankLookup);
        })();
    }, []);

    const CardTextElement = (props) => {
        const style = {
            margin: "0px"
        };

        return (
            <h4 style={style}>{props.text}</h4>
        );
    };

    const getProfilePhotoUrl = (referee) => {
        if (!referee.photo) {
            return '/static-media/unknown_referee.png';
        }
        return `/media/${referee.photo}`
    };

    // TODO: calculate number of referee games on backend and show in info component
    // TODO: calculate number of "important" (e.g. finals and semifinals) games on backend and show in info component
    if (!referee) {
        return <React.Fragment />;
    }
    return (
        <React.Fragment>
            <div>
                <div style={inlineBlockStyle}>
                    <h2>
                        <img
                            height="38px" width="38px"
                            src={badgeUrl[referee.rank]} 
                        />
                    </h2>
                </div>
                <div style={inlineBlockStyle}>
                    <h2>{`${referee.first_name} ${referee.last_name}`}</h2>
                </div>
            </div>
            <div>
                <div style={inlineBlockStyle}>
                    <img
                        height="240px" width="180px"
                        src={getProfilePhotoUrl(referee)} 
                    />
                </div>
                <div style={inlineBlockStyle}>
                    <div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text="Город:" />
                        </div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text={cities[referee.city]} />
                        </div>
                    </div>
                    <div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text="Ранг:" />
                        </div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text={ranks[referee.rank]} />
                        </div>
                    </div>
                    <div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text="Дата сдачи экзамена:" />
                        </div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text={`${referee.rank_update}`} />
                        </div>
                    </div>
                    <Protected require={requireLoggedIn}>
                        <div>
                            <BoundUserOrInviteComponent refereeId={referee.id} />
                        </div>
                    </Protected>
                </div>
            </div>
        </React.Fragment>
    );
};

export default RefereeInfoComponent;