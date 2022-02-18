import React from 'react';
import axios from 'axios';
import { DataGrid, Editing, Column, Paging, Scrolling, Selection, Lookup } from 'devextreme-react/data-grid';
import { DropDownBox } from 'devextreme-react/drop-down-box';
import { dataStoreFactory } from '../../apiDataStore';

const displayReferee = (referee) => {
    return referee && `${referee.first_name} ${referee.last_name} (${referee.rank})`;
};

const RefereeSelectBox = (props) => {
    const [isDropDownOpened, setIsDropDownOpened] = React.useState(false);
    const [referees, setReferees] = React.useState([props.data.value]);
    const [selectedReferees, setSelectedRefeerees] = React.useState([props.data.value]);

    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get('/api/referees');
            setReferees(data);
        })();
    }, []);

    const boxOptionChanged = ({ name, value }) => {
        if (name === 'opened') {
            setIsDropDownOpened(value);
        }
    };

    const changeDropDownBoxValue = ({ selectedRowKeys }) => {
        setSelectedRefeerees(selectedRowKeys);
        setIsDropDownOpened(false);
        props.data.setValue(selectedRowKeys[0]);
    };

    const dropDownOptions = { width: 500 };

    return (
        <DropDownBox
            dataSource={referees}
            value={selectedReferees && selectedReferees[0]}
            valueExpr="id"
            displayExpr={displayReferee}
            onOptionChanged={boxOptionChanged}
            opened={isDropDownOpened}
            dropDownOptions={dropDownOptions}>
            <DataGrid
                dataSource={referees}
                selectedRowKeys={selectedReferees}
                defaultFocusedRowKey={selectedReferees && selectedReferees[0]}
                onSelectionChanged={changeDropDownBoxValue}
                hoverStateEnabled={true}
                focusedRowEnabled={true}>
                <Column dataField="first_name" />
                <Column dataField="last_name" />
                <Column dataField="rank" />
                <Paging enabled={true} defaultPageSize={10} />
                <Scrolling mode="virtual" />
                <Selection mode="single" />
            </DataGrid>
        </DropDownBox>
    );
};

const Games = () => {
    const dataStore = dataStoreFactory('/api/games', 'id');

    const [referees, setReferees] = React.useState([]);

    React.useEffect(() => {
        (async () => {
            const { data } = await axios.get('/api/referees');
            setReferees(data);
        })();
    }, []);

    const EventCellRender = ({ value }) => {
        return <div>{value.name}</div>;
    };

    const RefereeCellRender = ({ value }) => {
        return <div>{displayReferee(value)}</div>
    };

    return (
        <React.Fragment>
            <h1>Games</h1>
            <DataGrid
                dataSource={dataStore}
                showBorders={true}
                columnAutoWidth={true}>
                <Editing
                    mode="row"
                    allowAdding={true}
                    allowDeleting={true}
                    allowUpdating={true}
                />
                <Column
                    dataField={"event"}
                    cellRender={EventCellRender} />
                <Column dataField={"first_player"} />
                <Column dataField={"second_player"} />
                <Column dataField={"date"} dataType={"date"} />
                <Column
                    dataField={"referee"}
                    cellRender={RefereeCellRender}
                    editCellComponent={RefereeSelectBox}>
                </Column>
                <Column
                    dataField={"assistant"}
                    cellRender={RefereeCellRender}
                    editCellComponent={RefereeSelectBox}>
                    <Lookup
                        dataSource={referees}
                        displayExpr={displayReferee}
                        valueExpr="id">
                    </Lookup>
                </Column>
            </DataGrid>
        </React.Fragment>
    );
}

export default Games;