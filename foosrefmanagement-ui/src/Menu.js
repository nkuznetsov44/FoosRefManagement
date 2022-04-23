import React from 'react';
import { Menu } from 'devextreme-react';
import { Link } from 'react-router-dom';
import LoginButton from './pages/login/LoginButton';


const menuItems = [
    {
        name: 'Рефери',
        path: '/'
    },
    {
        name: 'Игры',
        path: '/games'
    },
    {
        name: 'Турниры',
        path: '/events'

    }
];

const ItemComponent = ({ data }) => {
    const style = {
        margin: "0px 10px 0px 0px"
    };

    return (
        <Link to={data.path}>
            <h4 style={style}>{data.name}</h4>
        </Link>
    );
};

const MenuComponent = (props) => {
    const style = {
        display: "inline-block",
        margin: "0px 0px 0px 0px"
    };

    return (
        <React.Fragment>
            <div style={style}>
                <Menu
                    dataSource={menuItems}
                    displayExpr={"name"}
                    itemComponent={ItemComponent}
                />
            </div>
            <div style={style} >
                <LoginButton user={props.user} />
            </div>
        </React.Fragment>
    );
};

export default MenuComponent;