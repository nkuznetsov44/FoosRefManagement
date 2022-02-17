import React from 'react';
import ApiDrivenDataGrid from '../../components/ApiDrivenDataGrid';

const Games = () => {
    return (
        <React.Fragment>
            <h1>Games</h1>
            <ApiDrivenDataGrid
                endpoint="/api/games"
            />
        </React.Fragment>
    );
}

export default Games;