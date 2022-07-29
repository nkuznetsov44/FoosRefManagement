import React from 'react';
import { useSelector } from 'react-redux';
import BoundUserOrInviteComponent from './BoundUserOrInviteComponent';
import { api } from '../../../auth';

const RefereeInfoComponent = ({ referee }) => {
    const inlineBlockStyle = {
        display: "inline-block",
        verticalAlign: "top",
        margin: "0px 10px 10px 0px"
    };

    const [cities, setCities] = React.useState({});
    const [ranks, setRanks] = React.useState({});

    const user = useSelector((state) => state.user.user);
    const allowGetBoundUserOrInvite = Boolean(user);

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
        if (referee.photo == null) {
            return '/static-media/unknown_referee.png';
        }
        return `/media/${referee.photo}`
    };

    // TODO: calculate number of referee games on backend and show in info component
    // TODO: calculate number of "important" (e.g. finals and semifinals) games on backend and show in info component
    return (
        <React.Fragment>
            <h2>{`${referee.first_name} ${referee.last_name}`}</h2>
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
                            <CardTextElement text="Ранг:" />
                        </div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text={ranks[referee.rank]} />
                        </div>
                    </div>
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
                            <CardTextElement text="Дата сдачи экзамена:" />
                        </div>
                        <div style={inlineBlockStyle}>
                            <CardTextElement text={`${referee.rank_update}`} />
                        </div>
                    </div>
                    { allowGetBoundUserOrInvite &&
                        <div>
                            <BoundUserOrInviteComponent refereeId={referee.id} />
                        </div>
                    }
                </div>
            </div>
        </React.Fragment>
    );
};

export default RefereeInfoComponent;