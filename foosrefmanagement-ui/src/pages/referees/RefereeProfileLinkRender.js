import React from 'react';
import { Link } from 'react-router-dom';

const RefereeProfileLinkRender = ({ referee }) => {
    return (
        <Link to={`/refereeProfile/${referee.id}`}>
            {`${referee.last_name} ${referee.first_name}`}
        </Link>
    );
};

export default RefereeProfileLinkRender;