import React from 'react';
import { useParams } from 'react-router-dom';
import RefereeInfoComponent from './RefereeInfoComponent';
import RefereeGamesComponent from './RefereeGamesComponent';
import { api } from '../../../auth';

const RefereeProfile = () => {
    const { id } = useParams();
    const [referee, setReferee] = React.useState();

    React.useEffect(() => {
        (async () => {
            const { data } = await api.get(`/api/referees/${id}`);
            setReferee(data);
        })();
    }, [id]);

    return (
        <React.Fragment>
            <RefereeInfoComponent referee={referee}/>
            <RefereeGamesComponent refereeId={id} />
        </React.Fragment>
    );
};

export default RefereeProfile;