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
    const linkStyle = {
        color: '#666666',
        textDecorationcolor: '#666666'
    };

    const innerStyle = {
        margin: "0px 5px 0px 0px",
        textTransform: 'uppercase'
    };

    return (
        <Link to={data.path} style={linkStyle}>
            <h4 style={innerStyle}>{data.name}</h4>
        </Link>
    );
};

const MenuComponent = (props) => {
    const menuStyle = {
        display: "inline-block",
        margin: "0px 0px 0px 0px"
    };

    const loginButtonStyle = {
        display: "inline-block",
        margin: "0px 0px 0px 0px",
        float: "right"
    };

    return (
        <React.Fragment>
            <div style={menuStyle}>
                <Menu
                    dataSource={menuItems}
                    displayExpr={"name"}
                    itemComponent={ItemComponent}
                />
            </div>
            <div style={loginButtonStyle} >
                <LoginButton user={props.user} />
            </div>
        </React.Fragment>
    );
};

export default MenuComponent;