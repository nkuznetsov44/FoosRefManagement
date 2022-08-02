import React from 'react';
import { useSelector } from 'react-redux';
import { Breakpoint } from 'react-socks';
import MobileMenuComponent from './MobileMenu';
import DesktopMenuComponent from './DesktopMenu';

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

const MenuComponent = () => {
    const user = useSelector((state) => state.user.user);

    const filterItems = (items) => {
        return items.filter((value, index) => !value.loginRequired || user || false);
    }

    return (
        <React.Fragment>
            <Breakpoint small down>
                <MobileMenuComponent items={filterItems(menuItems)} />
            </Breakpoint>
            <Breakpoint medium up>
                <DesktopMenuComponent items={filterItems(menuItems)} />
            </Breakpoint>
        </React.Fragment>
    );
};

export default MenuComponent;