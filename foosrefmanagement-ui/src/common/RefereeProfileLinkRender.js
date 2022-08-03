import { Link } from 'react-router-dom';

const RefereeProfileLinkRender = ({ referee, displayValue }) => {
    const inactiveStyle = {
        color: "grey"
    };

    return (
        <Link
            to={`/refereeProfile/${referee.id}`}
            style={referee.is_active ? {} : inactiveStyle}>
            {displayValue(referee)}
        </Link>
    );
}

export default RefereeProfileLinkRender;