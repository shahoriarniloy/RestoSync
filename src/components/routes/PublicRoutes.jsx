import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AuthContext } from '../providers/AuthProvider';

const PublicRoutes = ({ children }) => {
    const { user } = useContext(AuthContext);

   
    

    if (user) {
        return <Navigate to="/" />;

    }

    return children;
};

PublicRoutes.propTypes = {
    children: PropTypes.node.isRequired
};

export default PublicRoutes;
