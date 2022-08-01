import React from 'react';
import { useSelector } from 'react-redux';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import DropDownButton from 'devextreme-react/drop-down-button';
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

const DesktopMenuComponent = ({ items }) => {
    const MenuItemRender = ({ item }) => {
        const linkStyle = {
            color: '#666666',
            textDecorationcolor: '#666666'
        };
    
        const innerStyle = {
            margin: "0px 10px 0px 0px",
            textTransform: 'uppercase'
        };
    
        return (
            <Link to={item.path} style={linkStyle}>
                <h4 style={innerStyle}>{item.text}</h4>
            </Link>
        );
    };

    const toolbarStyle = {
        backgroundColor: "#eee",
    };

    const fskLogoStyle = {
        height: "36px",
        margin: "0px 10px 0px 0px",
    };

    const buttonContainerStyle = {
        position: "relative",
        top: "50%"
    };

    return (
        <Toolbar style={toolbarStyle}>
            <Item location="before">
                <img
                    style={fskLogoStyle}
                    //src="/static-media/fsk.png"
                    src="https://rtsf.ru/images/logo.png"
                />
            </Item>
            {items.map((value, index) => {
                    return (
                        <Item location="before">
                            <MenuItemRender item={value} />
                        </Item>
                    );
                })
            }
            <Item location="after">
                <div style={buttonContainerStyle}>
                    <UserInfoOrLoginButton />
                </div>
            </Item>
        </Toolbar>
    );
};

const MobileMenuComponent = ({ items }) => {
    const MenuItemRender = (item) => {
        const linkStyle = {
            color: '#666666',
            textDecoration: "none",
        };

        return (
            <Link to={item.path} style={linkStyle}>
                <div>{item.text}</div>
            </Link>
        );
    };

    const toolbarStyle = {
        backgroundColor: "#eee",
    };

    const fskLogoStyle = {
        height: "36px",
        margin: "0px 10px 0px 0px",
    };

    const buttonContainerStyle = {
        position: "relative",
        top: "50%"
    };

    return (
        <Toolbar style={toolbarStyle}>
            <Item location="before">
                <img
                    style={fskLogoStyle}
                    src="/static-media/fsk.png"
                    //src="https://rtsf.ru/images/logo.png"
                />
            </Item>
            <Item location="before">
                <DropDownButton
                    text="Разделы"
                    items={items}
                    itemRender={MenuItemRender}
                />
            </Item>
            <Item location="after">
                <div style={buttonContainerStyle}>
                    <UserInfoOrLoginButton />
                </div>
            </Item>
        </Toolbar>
    );
};

const MenuComponent = () => {
    const user = useSelector((state) => state.user.user);

    if (window.innerWidth < 720) {
        return (
            <MobileMenuComponent
                items={menuItems.filter((value, index) => !value.loginRequired || user || false)}
            />
        );
    }
    return (
        <DesktopMenuComponent
            items={menuItems.filter((value, index) => !value.loginRequired || user || false)}
        />
    );
};

export default MenuComponent;