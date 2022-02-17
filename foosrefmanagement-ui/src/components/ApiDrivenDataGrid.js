import React from 'react';
import axios from 'axios';
import { DataGrid } from 'devextreme-react';

const ApiDrivenDataGrid = (props) => {
    const [items, setItems] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get(props.endpoint);
            setItems(data);
        })();
    }, [])

    return (
        <DataGrid
            dataSource={items}>
        </DataGrid>
    );
}

export default ApiDrivenDataGrid;