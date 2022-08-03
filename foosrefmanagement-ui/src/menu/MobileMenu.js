import React from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import DropDownButton from 'devextreme-react/drop-down-button';
import { Link } from 'react-router-dom';
import UserInfoOrLoginButton from '../auth/login/UserInfoOrLoginButton';

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
                />
            </Item>
            <Item location="before">
                <DropDownButton
                    text="Разделы"
                    items={items}
                    itemRender={MenuItemRender}
                    stylingMode="text"
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

export default MobileMenuComponent;