import React from 'react';
import { Link } from 'react-router-dom';

const RefereeProfileLinkRender = ({ referee }) => {
    const inactiveStyle = {
        color: "grey"
    };

    return (
        <Link
            to={`/refereeProfile/${referee.id}`}
            style={referee.is_active ? {} : inactiveStyle}>
            {`${referee.last_name} ${referee.first_name}`}
        </Link>
    );
};

export default RefereeProfileLinkRender;