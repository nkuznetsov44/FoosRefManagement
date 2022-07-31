import React from 'react';
import { useSelector } from 'react-redux';
import { Menu } from 'devextreme-react';
import { Link } from 'react-router-dom';
import UserInfoOrLoginButton from './pages/user/UserInfoOrLoginButton';

const menuItems = [
    {
        name: 'Рефери',
        path: '/',
        loginRequired: false
    },
    {
        name: 'Игры',
        path: '/games',
        loginRequired: false
    },
    {
        name: 'Турниры',
        path: '/events',
        loginRequired: false
    },
    {
        name: 'Users',
        path: '/users',
        loginRequired: true
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

    const user = useSelector((state) => state.user.user);

    if (!user && data.loginRequired) {
        return <React.Fragment />;
    }

    return (
        <Link to={data.path} style={linkStyle}>
            <h4 style={innerStyle}>{data.name}</h4>
        </Link>
    );
};

const MenuComponent = () => {
    const containerStyle = {
        minWidth: "485px",
    };

    const iconStyle = {
        display: "inline-block",
        margin: "0px 10px 0px 0px",
    };

    const menuStyle = {
        display: "inline-block",
        margin: "0px 0px 0px 0px",
    };

    const userInfoStyle = {
        margin: "0px 0px 0px 0px",
        float: "right"
    };

    return (
        <div style={containerStyle}>
            <div style={iconStyle}>
                <img height="inherit" src="/static-media/fsk.png" />
            </div>
            <div style={menuStyle}>
                <Menu
                    dataSource={menuItems}
                    displayExpr={"name"}
                    itemComponent={ItemComponent}
                    adaptivityEnabled={true}
                />
            </div>
            <div style={userInfoStyle} >
                <UserInfoOrLoginButton />
            </div>
        </div>
    );
};

export default MenuComponent;