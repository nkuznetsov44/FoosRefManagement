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
            <h5 style={innerStyle}>{item.text}</h5>
        </Link>
    );
};

const MenuComponent = () => {
    const user = useSelector((state) => state.user.user);

    return (
        <React.Fragment>
            <Toolbar>
                <Item location="before">
                    <img height="16px" src="/static-media/fsk.png" />
                </Item>
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
                <Item location="after">
                    <UserInfoOrLoginButton />
                </Item>
            </Toolbar>
        </React.Fragment>
    );
};

export default MenuComponent;