import React from 'react';
import ApiDrivenDataGrid from '../../components/ApiDrivenDataGrid';

const Events = () => {
    return (
        <React.Fragment>
            <h1>Events</h1>
            <ApiDrivenDataGrid
                endpoint="/api/events"
            />
        </React.Fragment>
    );
}

export default Events;