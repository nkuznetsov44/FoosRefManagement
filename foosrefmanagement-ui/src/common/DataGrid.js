import React from 'react';
import notify from 'devextreme/ui/notify';
import { DataGrid } from 'devextreme-react/data-grid';

const CustomDataGrid = (props) => {
    const onDataErrorOccurred = (e) => {
        const message = e?.error?.response?.data?.detail || 'Unexpected error';
        notify(message, 'error', 5000);
    };

    return (
        <DataGrid
            {...props}
            showBorders={true}
            columnAutoWidth={true}
            rowAlternationEnabled={true}
            onDataErrorOccurred={onDataErrorOccurred}
        />
    );
};

export default CustomDataGrid;