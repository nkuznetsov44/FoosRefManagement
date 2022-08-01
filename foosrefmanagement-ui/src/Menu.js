import React from 'react';
import { useSelector } from 'react-redux';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import { Link } from 'react-router-dom';
import UserInfoOrLoginButton from './pages/user/UserInfoOrLoginButton';

const menuItems = [
    {
        text: 'Рефери',
        path: '/',
        loginRequired: false
    },
    {
        text: 'Игры',
        path: '/games',
        loginRequired: false
    },
    {
        text: 'Турниры',
        path: '/events',
        loginRequired: false
    },
    {
        text: 'Users',
        path: '/users',
        loginRequired: true
    }
];

const MenuItemRender = ({ item }) => {
    const linkStyle = {
        color: '#666666',
        textDecorationcolor: '#666666'
    };

    const innerStyle = {
        margin: "0px 5px 0px 0px",
        textTransform: 'uppercase'
    };

    return (
        <Link to={item.path} style={linkStyle}>
            <h4 style={innerStyle}>{item.text}</h4>
        </Link>
    );
};

const MenuComponent = () => {
    const user = useSelector((state) => state.user.user);

    const topToolbarStyle = {
        backgroundColor: "#ddd"
    };

    return (
        <React.Fragment>
            <Toolbar style={topToolbarStyle}>
                <Item location="before" locateInMenu="never">
                    <img height="36px" src="/static-media/fsk.png" />
                </Item>
                <Item location="after">
                    <UserInfoOrLoginButton />
                </Item>
            </Toolbar>
            <Toolbar>
                {menuItems
                    .filter((value, index) => !value.loginRequired || user || false)
                    .map((value, index) => {
                        return (
                            <Item location="before">
                                <MenuItemRender item={value} />
                            </Item>
                        );
                    })
                }
            </Toolbar>
        </React.Fragment>
    );
};

export default MenuComponent;