import { Avatar } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';

import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/userRole';

// import useCartsData from '../../hooks/useCartsData';
// import useAdmin from '../../hooks/useAdmin';

const NavBar = () => {
  const { loggedUser } = useRole();
  const { user, logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsScrolled(scrollPosition > 50); // Adjust scroll threshold (default 50px)
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll); // Cleanup
  }, []);

  const handleLogout = () => {
    logOut()
      .then(result => {
        console.log(result);
        Swal.fire({
          icon: 'success',
          title: 'Log Out successful',
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch(error => {
        console.error(error.message);
      });
    // console.log(user);
  };

  const Links = (
    <div className="flex flex-col inter   lg:flex-row gap-1">
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isActive ? 'border-2 font-bold  ' : isPending ? ' font-bold ' : ''
          }
        >
          HOME
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/all-properties"
          className={({ isActive, isPending }) =>
            isActive ? 'border-2 font-bold ' : isPending ? 'pending' : ''
          }
        >
          ALL PROPERTIES
        </NavLink>
      </li>
      <li>
        <NavLink
          to={
            (loggedUser?.role === 'Admin' && '/dashboard/admin-profile') ||
            (loggedUser?.role === 'Agent' && '/dashboard/agent-profile') ||
            '/dashboard/user-profile'
          }
          className={({ isActive, isPending }) =>
            isActive ? 'border-2 font-bold ' : isPending ? 'pending' : ''
          }
        >
          DASHBOARD
        </NavLink>{' '}
      </li>
    </div>
  );

  return (
    <div
      className={`flex fixed top-0 border-b-2 w-screen px-4 py-2 transition duration-300 ease-in-out ${
        isScrolled ? 'bg-white text-black' : 'bg-transparent text-blue-500'
      } justify-between ease-in-out items-center    z-50 mx-auto `}
    >
      <div className="flex items-center justify-center pl-2">
        <div className="dropdown">
          <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h8m-8 6h16"
              />
            </svg>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-40"
          >
            {Links}
            <div className="navbar-end mt-2 ">
              <div className=" ">
                {user ? (
                  <div className="">
                    <div className="block lg:hidden mb-2">
                      <button
                        onClick={handleLogout}
                        className="w-24 text-white font-bold border-none btn bg-blue-500 hover:bg-gray-900  rounded-lg "
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Link to={'/login'}>
                      <button className="btn w-32 bg-blue-500 mr-3 ">
                        Sign In
                      </button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </ul>
        </div>

        <Link to={'/'} className="h-full">
          <div className="flex justify-center h-full gap-2 items-center">
            <img
              className="h-10 w-10 rounded-full"
              src="https://i.postimg.cc/28Rn2bJ4/white-logo.png"
              alt=""
            />
            <h3 className="text-2xl hidden md:block font-extrabold">
              Heaven Residence
            </h3>
          </div>
        </Link>
      </div>
      <div className=" hidden  lg:flex">
        <ul className="menu menu-horizontal px-1"> {Links}</ul>
      </div>

      <div className=" ">
        <div className="flex  ">
          {user ? (
            <div className="flex gap-3 justify-between items-center mr-3">
              <nav className="relative parent ">
                <ul className="flex items-start gap-2">
                  <li>
                    <div className="flex  items-center gap-3">
                      <h2 className="font-bold lg:block hidden">
                        {user?.displayName || ''}
                      </h2>
                      <Avatar
                        src={
                          (user && user?.photoURL) ||
                          'https://i.ibb.co/zmbRY07/images.png'
                        }
                        className="mr-4  bg-no-repeat bg-cover bg-[url(https://i.ibb.co/zmbRY07/images.png)]"
                      />
                    </div>
                  </li>
                </ul>
              </nav>
              <button
                onClick={handleLogout}
                className="w-28 hidden md:block text-white font-bold border-none btn bg-blue-500 hover:bg-gray-900  rounded-lg "
              >
                Log Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3 mr-5">
              <div>
                <Link to={'/login'}>
                  <button className="w-28 text-white font-bold border-none btn bg-blue-500   py-1 px-1 rounded-lg">
                    Sign In
                  </button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NavBar;
