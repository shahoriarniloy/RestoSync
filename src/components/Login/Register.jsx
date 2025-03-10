import { createContext, useContext, useState } from "react";
import { Helmet } from "react-helmet";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import auth from "../../firebase/firebase.init"; // Add this import
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { AuthContext } from "../providers/AuthProvider";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { updateUserProfile } = useContext(AuthContext);
    const [registerError, setRegisterError] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const handleRegister = async e => {
        e.preventDefault();
        const name = e.target.name.value;
        const email = e.target.email.value;
        const url = e.target.url.value;
        const password = e.target.password.value;

        // console.log(email, password, name, url);
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        if (password.length < 6) {
            setRegisterError('Password Length must be at least 6 characters');
            return;
        }

        if (!uppercaseRegex.test(password)) {
            setRegisterError('Password must contain an uppercase letter');
            return;
        }

        if (!lowercaseRegex.test(password)) {
            setRegisterError('Password must contain a lowercase letter');
            return;
        }

        try {
            // Create user in Firebase authentication
            const result = await createUserWithEmailAndPassword(auth, email, password);

            // Update user profile
            await updateUserProfile(name, url);

            // Set user data
            const user = { email, name };

            // Save user data to the database
            fetch('https://resturant-pied-eta.vercel.app/register', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json'
                },
                body: JSON.stringify(user)
            })
                .then(res => res.json())
                .then(data => {
                    if (data.insertedId) {
                        console.log('User added to Database');
                    }
                });

            navigate(location?.state ? location.state : '/');
            toast.success("Registered");
        } catch (error) {
            console.error(error);
            setRegisterError(error.message);
        }
    };

    return (
        <div className="max-w-[1400px] m-auto">
            <Helmet>
                <title>Sign Up</title>
            </Helmet>
            <form onSubmit={handleRegister} className="flex flex-col justify-center items-center">
                <label className="form-control w-1/2">
                    <div className="label">
                        <span className="label-text">Enter Your Name:</span>
                    </div>
                    <input type="text" name="name" placeholder="Type here" className="input input-bordered" required />
                </label>
                <label className="form-control w-1/2">
                    <div className="label">
                        <span className="label-text">Enter Your Email:</span>
                    </div>
                    <input type="email" name="email" placeholder="Type here" className="input input-bordered" required />
                </label>
                <label className="form-control w-1/2">
                    <div className="label">
                        <span className="label-text">Enter Your Photo URL:</span>
                    </div>
                    <input type="text" name="url" placeholder="Type here" className="input input-bordered" required  />
                </label>
                <label className="form-control mb-8 w-1/2 ">
                    <div className="label">
                        <span className="label-text">Enter Your Password:</span>
                    </div>
                    <div className="grid grid-cols-12 items-center">
                        <input type={showPassword ? "text" : "password"} name="password" placeholder="Type here" className=" input input-bordered rounded-r-none border-r-0 col-span-11" required />
                        <button className="btn btn-outline p-0 rounded-l-none border-l-0 border-gray-300" onClick={() => setShowPassword(!showPassword)}>{showPassword ? <FaEyeSlash /> : <FaEye />}</button>
                    </div>
                </label>
                {registerError && <p className="text-red-500 mb-4">{registerError}</p>}
                <input type="submit" value="Create Account" className="btn btn-success w-60 text-white" />
                <h2 className="text-sm text-gray-600  mt-6 mb-4">Or, Already Have an Account?</h2>
                <Link to="/login"><button className="btn btn-primary w-60 mb-8">Login</button></Link>
            </form>
        </div>
    );
};

export default Register;
