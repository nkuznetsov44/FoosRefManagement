import React from 'react';
import { Link } from 'react-router-dom';

const RefereeProfileLinkCellRender = ({ data, value }) => {
    return (
        <Link to={`/refereeProfile/${data.id}`}>
            {value}
        </Link>
    );
};

export default RefereeProfileLinkCellRender;