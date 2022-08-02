import { useAuth } from '../auth/AuthProvider';

const Protected = ({ require, children }) => {
    const { user } = useAuth();
    return require(user) ? children : null;
};

export default Protected;