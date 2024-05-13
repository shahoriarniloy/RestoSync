import { Outlet } from 'react-router-dom';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import { useTheme } from '../components/Theme';





const Main = () => {

    const { darkTheme } = useTheme();




    return (
            <div className={`  ${darkTheme ? ' text-white bg-black' : 'text-black bg-base'}`}>
                <Navbar></Navbar>
                <Outlet />
                <Footer></Footer>
            </div>
    );
};

export default Main;
