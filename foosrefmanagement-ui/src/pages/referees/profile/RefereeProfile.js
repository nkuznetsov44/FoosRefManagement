import React from 'react';
import { useParams } from 'react-router-dom';
import RefereeInfoComponent from './RefereeInfoComponent';
import RefereeGamesComponent from './RefereeGamesComponent';

const RefereeProfile = () => {
    const { id } = useParams();
    const [referee, setReferee] = React.useState();

    return (
        <React.Fragment>
            <RefereeInfoComponent referee={referee}/>
            <RefereeGamesComponent refereeId={id} />
        </React.Fragment>
    );
};

export default RefereeProfile;