import React from 'react';
import { useParams } from 'react-router-dom';
import RefereeInfoComponent from './RefereeInfoComponent';
import RefereeGamesComponent from './RefereeGamesComponent';
import { useAxios } from '../../../auth/AxiosInstanceProvider';

const RefereeProfile = () => {
    const { api } = useAxios();
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
            <RefereeGamesComponent refereeId={Number(id)} />
        </React.Fragment>
    );
};

export default RefereeProfile;