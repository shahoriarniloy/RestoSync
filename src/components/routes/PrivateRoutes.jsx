import { AuthContext } from '../providers/AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import { useContext } from 'react';


const PrivateRoutes = ({children}) => {
    const {user, loading}= useContext(AuthContext);
    const location = useLocation();

    if(loading)
    {
        
        return <div className='flex flex-row justify-center items-center'>

        <span className="loading loading-bars loading-xs"></span>
        <span className="loading loading-bars loading-sm"></span>
        <span className="loading loading-bars loading-md"></span>
        <span className="loading loading-bars loading-lg"></span>
        </div>
        
    }
    if(user){
        return children;
    }

    

    return (
        <>
            <Navigate state={location.pathname} to="/login"></Navigate>
        </>
    );
};

export default PrivateRoutes;

PrivateRoutes.propTypes ={
    children: PropTypes.node
}