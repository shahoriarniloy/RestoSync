import axios from 'axios';
import { useEffect } from 'react';
import { useContext } from 'react';
import { AuthContext } from '../components/providers/AuthProvider';
import { useNavigation } from 'react-router-dom';


const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000', 
    withCredentials: true
});

const useAxiosSecure = () => {
    const navigate= useNavigation()
    const {  logOut } = useContext(AuthContext);


    useEffect(()=>{
        axiosSecure.interceptors.response.use(res=>{
            return res;
        },error=>{
            console.log(error.response.status);
            console.log('error tracked in the interceptor', error.response);
            if(error.response.status === 401 || error.response.status === 403){
                console.log('logout the user');

                    logOut()
                    .then(()=>{
                        navigate('/login')
                    })
                    .catch(error=>console.log(error))
                     
                





            }
        })
    },[])
    return axiosSecure;
};

export default useAxiosSecure;
