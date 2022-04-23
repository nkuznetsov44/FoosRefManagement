import { Menu } from 'devextreme-react';
import { Link } from 'react-router-dom';

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
    return (
        <Link to={data.path}>{data.name}</Link>
    );
};

const MenuComponent = () => {
    return (
        <Menu
            dataSource={menuItems}
            displayExpr={"name"}
            itemComponent={ItemComponent}
        />
    );
};

export default MenuComponent;