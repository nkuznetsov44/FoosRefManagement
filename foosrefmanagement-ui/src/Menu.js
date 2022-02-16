import { Menu } from 'devextreme-react';
import { Link } from 'react-router-dom';

const menuItems = [{
    name: 'Games',
    path: '/games'
}, {
    name: 'Referees',
    path: '/referees'
}, {
    name: 'Events',
    path: '/events'
}];

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