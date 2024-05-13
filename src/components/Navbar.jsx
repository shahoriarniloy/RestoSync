import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './providers/AuthProvider';
import { useTheme } from './Theme';


const Navbar = () => {
  const { user, logOut, loading } = useContext(AuthContext);
  const { darkTheme, toggleTheme } = useTheme();

  
  const handleLogOut = () => {
    logOut()
      .then(() => console.log('Logged Out'))
      .catch(error => console.error(error));
  };
  if (loading) {
    return (
        <div className='flex flex-row justify-center items-center'>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
            <span className="loading loading-spinner text-warning"></span>
            <span className="loading loading-spinner text-error"></span>
        </div>
    );
}


    return (
        <div className={` navbar ${darkTheme ? ' text-white bg-black' : 'text-black bg-base'}`}>
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul
  tabIndex={0}
  className={`menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52 ${darkTheme ? 'text-white bg-black' : 'text-black bg-base'}`}
>
<li><NavLink className={({ isActive, isPending }) =>
              isActive
                ? ("text-green-500")
                : isPending
                  ? "pending"
                  : ("text-black")
            } to="/"><p className={` ${darkTheme ? ' text-white' : ''}`}>Home</p></NavLink></li>                        
<li><NavLink className={({ isActive, isPending }) =>
              isActive
                ? ("text-green-500")
                : isPending
                  ? "pending"
                  : ("text-black")
            } to="/allfoods"><p className={` ${darkTheme ? ' text-white' : ''}`}>All Food</p></NavLink></li>                        
<li><NavLink className={({ isActive, isPending }) =>
              isActive
                ? ("text-green-500")
                : isPending
                  ? "pending"
                  : ("text-black")
            } to="/gallery"><p className={` ${darkTheme ? ' text-white' : ''}`}>Gallery</p></NavLink></li>                    </ul>
                </div>
                <div className='h-12 w-12 rounded-full overflow-hidden'>
    <img src="https://i.ibb.co/f8qWJY4/OIG4-m-M0lvw5e-Lb-Jt.jpgRestoSync" alt="RestoSync" className="h-12 w-12 " />
</div>

              </div>
            <div className="navbar-center hidden lg:flex " >
                <ul className="menu menu-horizontal px-1 ">
                <li><NavLink className={({ isActive, isPending }) =>
              isActive
                ? ("text-green-500")
                : isPending
                  ? "pending"
                  : ("text-black")
            } to="/"><p className={` ${darkTheme ? ' text-white' : ''}`}>Home</p></NavLink></li>                    
<li><NavLink className={({ isActive, isPending }) =>
              isActive
                ? ("text-green-500")
                : isPending
                  ? "pending"
                  : ("text-black")
            } to="/allfoods"><p className={` ${darkTheme ? ' text-white' : ''}`}>All Food</p></NavLink></li>                    
<li><NavLink className={({ isActive, isPending }) =>
              isActive
                ? ("text-green-500")
                : isPending
                  ? "pending"
                  : ("text-black")
            } to="/gallery"><p className={` ${darkTheme ? ' text-white' : ''}`}>Gallery</p></NavLink></li>                </ul>
            </div>
            <div className="navbar-end">



           

          
  <div className='flex flex-col items-center font-paragraph mr-4'><p className='text-xs'>Theme</p>
      <label className="flex cursor-pointer gap-2" onClick={toggleTheme}>
            <input 
              type="checkbox" 
              value="synthwave" 
              className="toggle theme-controller"
            />
        </label>
    </div>





            <div className="flex-none">
    <div className="dropdown dropdown-end flex items-center">
        {user ? (
            <>
                <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                    <div className="w-12 rounded-full">
                        <img className="rounded-full h-16 w-16 border border-white lg:border-2" alt="Profile Image" src={user.photoURL ? user.photoURL : "https://i.ibb.co/v1qmfRn/836.jpg"} />
                    </div>
                </div>
                <ul tabIndex={0} className={` navbar ${darkTheme ? ' text-white bg-black menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow rounded-box w-52' : 'text-black bg-base-100 menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow  rounded-box w-52'}`}>
                    <li>
                        <Link to="/profile" className="justify-between">
                            {user.displayName ? user.displayName : `Profile`}
                        </Link>
                    </li>
                    <li><button ><Link to="/foods">Add Food Item</Link></button></li>
                    <li><button ><Link to="/userfoods">My Food Items</Link></button></li>
                    <li><button ><Link to="/userpurchases/:id">My Purchases</Link></button></li>

                    <li><a onClick={handleLogOut}>Logout</a></li>
                </ul>
                <a className="btn bg-orange-500 text-white" onClick={handleLogOut}>Logout</a>

            </>
        ) : (
            <button className='btn btn-primary'><Link to="/login">Login</Link></button>
        )}

    </div>
</div>

            </div>
        </div>
    );
};

export default Navbar;
