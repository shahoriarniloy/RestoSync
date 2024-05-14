import { FaFacebookF, FaInstagram } from 'react-icons/fa';
import { ToastContainer } from 'react-toastify';

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center p-4  w-full bg-white bg-opacity-30 mt-12 text-white bg-cover w-full h-54 py-16" style={{backgroundImage: "url('https://i.ibb.co/TRfPJHL/fresh-gourmet-meal-beef-taco-salad-plate-generated-by-ai.jpg')"}}>
                <div className="flex justify-center">
                    <img src="https://i.ibb.co/f8qWJY4/OIG4-m-M0lvw5e-Lb-Jt.jpg" alt="logo" className="h-32 w-32 rounded-full "/>
                </div>
                <h1 className='font-tittle text-xl text-orange-600'>RestoSync</h1>
                <div className="flex justify-center mt-4">
                    <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="mr-4">
                        <FaFacebookF className="text-white text-xl" />
                    </a>
                    <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer">
                        <FaInstagram className="text-white text-xl" />
                    </a>
                </div>
                <aside><p>Copyright © 2024 - All rights reserved by RestoSync Ltd</p></aside>
            </footer>
            <ToastContainer />
        </div>
    );
};

export default Footer;
