import React from 'react';
import Toolbar, { Item } from 'devextreme-react/toolbar';
import { Link } from 'react-router-dom';
import UserInfoOrLoginButton from '../pages/user/login/UserInfoOrLoginButton';

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
                    src="/static-media/fsk.png"
                />
            </Item>
            {items.map((value, index) => {
                    return (
                        <Item key={index} location="before">
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

export default DesktopMenuComponent;