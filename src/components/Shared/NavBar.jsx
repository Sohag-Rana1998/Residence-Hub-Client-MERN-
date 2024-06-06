import { Avatar } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import Swal from 'sweetalert2';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/userRole';

// import useCartsData from '../../hooks/useCartsData';
// import useAdmin from '../../hooks/useAdmin';

const NavBar = () => {
  const { loggedUser } = useRole();
  const localTheme = localStorage.getItem('theme');
  const { user, logOut } = useAuth();
  const [theme, setTheme] = useState(localTheme);
  // const { isAdmin } = useAdmin();
  const [type, setType] = useState(false);
  // const { cart } = useCartsData();
  // console.log(cart);

  useEffect(() => {
    localStorage.setItem('theme', theme);
    const localTheme = localStorage.getItem('theme');
    if (localTheme == 'synthwave') {
      setType(true);
    } else {
      setType(false);
    }
    document.querySelector('html').setAttribute('data-theme', localTheme);
  }, [theme]);

  const handleToggle = e => {
    setType(!type);

    if (e.target.checked) {
      setTheme('synthwave');
    } else {
      setTheme('light');
    }
  };

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

  //https://i.postimg.cc/66LCsndF/light.png
  //https://i.postimg.cc/RFxv43cD/dark.png
  const themeButton = (
    <>
      {/* <a className=" h-12  w-12 bg-black rounded-full">
        <img
          className="w-full h-full p-1"
          src="https://i.postimg.cc/66LCsndF/light.png"
          alt=""
        />
      </a> */}
      <label className="cursor-pointer grid place-items-center">
        <input
          onChange={handleToggle}
          type="checkbox"
          value="synthwave"
          className="toggle theme-controller h-7 md:h-7 w-14 bg-orange-500 row-start-1 col-start-1 col-span-2"
          checked={type}
        />
        <svg
          className="col-start-1 row-start-1 stroke-base-100 fill-base-100"
          xmlns="http://www.w3.org/2000/svg"
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="5" />
          <path d="M12 1v2M12 21v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M1 12h2M21 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4" />
        </svg>
        <svg
          className="col-start-2 row-start-1 stroke-base-100 fill-base-100"
          xmlns="http://www.w3.org/2000/svg"
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
        </svg>
      </label>
    </>
  );

  const Links = (
    <div className="flex flex-col inter   lg:flex-row gap-1">
      <li>
        <NavLink
          to="/"
          className={({ isActive, isPending }) =>
            isActive ? 'border-2 font-bold ' : isPending ? 'pending' : ''
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
          All Properties
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
      className={`flex justify-between items-center  container fixed z-50 mx-auto  ${
        type ? 'bg-[#1A103D]' : 'bg-white'
      } `}
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
                    <Avatar
                      title={user?.displayName || ''}
                      src={
                        (user && user?.photoURL) ||
                        'https://i.ibb.co/zmbRY07/images.png'
                      }
                      className="mr-4 mb-2 cursor-pointer bg-no-repeat bg-cover bg-[url(https://i.ibb.co/zmbRY07/images.png)]"
                    />

                    <Link to={'/user-profile'}>
                      <button className="btn w-32  bg-blue-600 hover:bg-blue-gray-900   ">
                        User Profile
                      </button>
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="btn w-32  bg-blue-600 hover:bg-blue-gray-900   "
                    >
                      Log Out
                    </button>
                  </div>
                ) : (
                  <div>
                    <Link to={'/login'}>
                      <button className="btn w-32 btn-bg mr-3 ">Sign In</button>
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
            <div className="flex gap-3 justify-between items-center">
              {themeButton}
              <nav className="relative parent ">
                <ul className="flex items-start gap-2">
                  <li>
                    <div className="flex items-center gap-3">
                      <Avatar
                        src={
                          (user && user?.photoURL) ||
                          'https://i.ibb.co/zmbRY07/images.png'
                        }
                        className="mr-4 cursor-pointer bg-no-repeat bg-cover bg-[url(https://i.ibb.co/zmbRY07/images.png)]"
                      />
                    </div>
                    <ul className="dropDown">
                      <div className="w-auto bg-[#006740] bg-opacity-50 dropdownMenu duration-500   z-10   rounded-xl p-3   ">
                        <div className="flex flex-col  items-end">
                          <h2 className="w-full hover:bg-blue-500 bg-gray-500  font-bold  p-2 rounded-md mb-2">
                            {user?.displayName || ''}
                          </h2>
                          <Link to={'/user-profile'}>
                            <button className="btn  hover:bg-blue-500 mb-2 bg-gray-500 ">
                              User Profile
                            </button>
                          </Link>
                          <button
                            onClick={handleLogout}
                            className="btn hover:bg-blue-500 bg-gray-500 "
                          >
                            Log Out
                          </button>
                        </div>
                      </div>
                    </ul>
                  </li>
                </ul>
              </nav>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {themeButton}
              <div>
                <Link to={'/login'}>
                  <button className="w-24 font-bold  inter  py-1 px-1 rounded-lg">
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
