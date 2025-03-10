import { Link } from 'react-router-dom';
import { Helmet } from "react-helmet";
import { useContext} from "react";
import { AuthContext } from "../providers/AuthProvider";
import UserFoods from '../foods/UserFoods';
import MyPurchase from '../purchase/MyPurchase';



const ViewProfile = () => {
    const { user } = useContext(AuthContext);





  return (


    <div className='w-3/4 grid grid-cols-1  mx-auto'>

<div className="w-full m-auto flex flex-col justify-center items-center gap-6 h-3/4">
      <Helmet>
                <title>View Profile</title>
            </Helmet>

            <div className="divider divider-warning mb-4"></div>

            <h1 className="text-center text-4xl text-orange-500  font-bold   font-tittle">Profile</h1>
<div className="divider divider-warning mb-12"></div>
    










        <div className="w-3/4 p-8 sm:flex sm:space-x-6 bg-orange-100 text-black rounded-xl mb-0">
            <div className="flex-shrink-0 w-full mb-6 h-44 sm:h-32 sm:w-32 sm:mb-0">
                <img src={user.photoURL} alt="" className="object-cover object-center w-full h-full rounded dark:bg-gray-500" />
            </div>
            <div className="flex flex-col space-y-4">
                <div>
                    <h2 className="text-2xl font-semibold font-tittle">{user.displayName}</h2>
                </div>
                <div className="space-y-1">
                    <span className="flex items-center space-x-2">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" aria-label="Email address" className="w-4 h-4">
                            <path fill="currentColor" d="M274.6,25.623a32.006,32.006,0,0,0-37.2,0L16,183.766V496H496V183.766ZM464,402.693,339.97,322.96,464,226.492ZM256,51.662,454.429,193.4,311.434,304.615,256,268.979l-55.434,35.636L57.571,193.4ZM48,226.492,172.03,322.96,48,402.693ZM464,464H48V440.735L256,307.021,464,440.735Z"></path>
                        </svg>
                        <span className="dark:text-gray-600">{user.email}</span>
                    </span>

                    <Link  to="/updateprofile"><button className='btn bg-gray-900 border border-black text-white w-full mt-4 mb-4'>Update Profile</button></Link>

                    
                </div>
            </div>

        </div>
       

</div>
<div className='flex lg:flex-row flex-col lg:gap-6'>
<UserFoods></UserFoods>
        <MyPurchase></MyPurchase>
</div>


    </div>
    






    
  );
};


export default ViewProfile;