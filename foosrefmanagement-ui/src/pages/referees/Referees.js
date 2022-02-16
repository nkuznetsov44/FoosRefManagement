import React from 'react';
import axios from 'axios';
import { DataGrid } from 'devextreme-react';

const Referees = () => {
    const [referees, setReferees] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get('/api/referees');
            setReferees(data);
        })();
    }, [])

    return (
        <React.Fragment>
            <h1>Referees</h1>
            <div className="refereesTableWrapper">
                <DataGrid
                    dataSource={referees}>
                </DataGrid>
            </div>
        </React.Fragment>
    );
}

export default Referees;