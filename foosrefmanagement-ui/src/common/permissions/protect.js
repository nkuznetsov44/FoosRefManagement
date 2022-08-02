import { useSelector } from 'react-redux';

const Protected = (props) => {
    const user = useSelector((state) => state.user.user);
    return props.require(user) ? props.children : null;
};

export default Protected;