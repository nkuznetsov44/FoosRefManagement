import React from 'react';
import ApiDrivenDataGrid from '../../components/ApiDrivenDataGrid';

const Referees = () => {
    return (
        <React.Fragment>
            <h1>Referees</h1>
            <ApiDrivenDataGrid
                endpoint="/api/referees"
            />
        </React.Fragment>
    );
}

export default Referees;