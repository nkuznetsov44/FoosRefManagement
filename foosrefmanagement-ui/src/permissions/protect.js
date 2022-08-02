import { useAuth } from '../auth/auth';

const Protected = (props) => {
    const { user } = useAuth();
    return props.require(user) ? props.children : null;
};

export default Protected;