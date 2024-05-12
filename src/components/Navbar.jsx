import React from 'react';
import { NavLink } from 'react-router-dom';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './providers/AuthProvider';
import { useTheme } from './Theme';


const Navbar = () => {
  const { user, logOut } = useContext(AuthContext);
  const { darkTheme, toggleTheme } = useTheme();

  
  const handleLogOut = () => {
    logOut()
      .then(() => console.log('Logged Out'))
      .catch(error => console.error(error));
  };


    return (
        <div className="navbar bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                        </svg>
                    </div>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
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
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
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



           

            <label className="cursor-pointer grid place-items-center" onClick={toggleTheme}>
              <input type="checkbox" value="synthwave" className="toggle theme-controller bg-base-content row-start-1 col-start-1 col-span-2"/>
              <svg className="col-start-1 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="5"/><path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
              <svg className="col-start-2 row-start-1 stroke-base-100 fill-base-100" xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg>
            </label>






                <div className="flex-none">
                    <div className="dropdown dropdown-end">
                        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar">
                            <div className="w-12 rounded-full">
                                <img className="rounded-full h-16 w-16 border border-white lg:border-2" alt="Profile Image" src={user ? user.photoURL : "https://i.ibb.co/v1qmfRn/836.jpg"} />

                            </div>
                        </div>
                        <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                            <li>
                                <Link to="/profile" className="justify-between">
                                    {user ? user.displayName: `Profile`}
                                </Link>
                            </li>
                            <li><a>Settings</a></li>
                            <li><a onClick={handleLogOut}>Logout</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Navbar;
