import { Avatar } from '@material-tailwind/react';
import { useEffect, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { MdOutlineLogin } from 'react-icons/md';
import { FaUserAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import { MdLogout } from 'react-icons/md';
import useAuth from '../../hooks/useAuth';
import useRole from '../../hooks/userRole';

// import useCartsData from '../../hooks/useCartsData';
// import useAdmin from '../../hooks/useAdmin';

const NavBar = () => {
  const { loggedUser } = useRole();
  const { user, logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const showDashboardLink = location.pathname.includes('/dashboard');
  console.log(showDashboardLink);
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

  const dashboardLink = (
    <>
      {loggedUser?.role === 'Admin' && (
        <ul className="menu px-2">
          <li className="mb-1">
            <NavLink
              to={'/'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              HOME
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/all-properties'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              All Properties
            </NavLink>
          </li>

          <li className="mb-1">
            <NavLink
              to={'/dashboard/admin-profile'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30  text-white font-bold '
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              Admin Profile
            </NavLink>
          </li>

          <li className="mb-1">
            <NavLink
              to={'/dashboard/manage-properties'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white '
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              Manage Properties
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/dashboard/advertise-property'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white '
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              Advertise Properties
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/dashboard/manage-users'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              Manage Users
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/dashboard/manage-reviews'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              Manage Reviews
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/dashboard/reported-properties'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              Reported Property
            </NavLink>
          </li>
        </ul>
      )}
      {loggedUser?.role === 'Agent' && (
        <ul className="menu px-2">
          <li className="mb-1">
            <NavLink
              to={'/'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              HOME
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/all-properties'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              All Properties
            </NavLink>
          </li>

          <li className="mb-1">
            <NavLink
              to={'/dashboard/agent-profile'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              Agent Profile
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/dashboard/add-property'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              Add Property
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/dashboard/added-properties'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              My Added Properties
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/dashboard/requested-properties'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              {' '}
              Requested Properties
            </NavLink>
          </li>

          <li className="mb-1">
            <NavLink
              to={'/dashboard/sold-properties'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              My Sold Properties
            </NavLink>
          </li>
        </ul>
      )}

      {loggedUser?.role || (
        <ul className="menu px-2">
          <li className="mb-1">
            <NavLink
              to={'/'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              HOME
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/all-properties'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              All Properties
            </NavLink>
          </li>

          <li className="mb-1">
            <NavLink
              to={'/dashboard/user-profile'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              My Profile
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/dashboard/wishlist'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              Wishlist
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/dashboard/bought-properties'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              Property Bought
            </NavLink>
          </li>
          <li className="mb-1">
            <NavLink
              to={'/dashboard/my-reviews'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-black/30 font-bold text-white'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              My-Reviews
            </NavLink>
          </li>
        </ul>
      )}
    </>
  );

  return (
    <div
      className={`flex mx-auto fixed top-0 border-b-2 lg:w-screen w-11/12   py-2 transition duration-300 ease-in-out ${
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
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-60"
          >
            {showDashboardLink ? dashboardLink : Links}
            <div className="navbar-end mt-2 ">
              <div className=" ">
                {user ? (
                  <div className="">
                    <div>
                      <button
                        onClick={handleLogout}
                        className=" w-32  text-white  btn bg-blue-500 hover:bg-gray-900  rounded-lg "
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                ) : (
                  <div>
                    <Link to={'/login'}>
                      <button className="btn w-32 border-none text-white bg-blue-500">
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
              RESIDENCE HUB
            </h3>
          </div>
        </Link>
      </div>
      <div className=" hidden  lg:flex">
        <ul className="menu menu-horizontal px-1"> {Links}</ul>
      </div>

      <div className="pr-4 lg:pr-8">
        <div className="flex ">
          {user ? (
            <div className="flex gap-3 justify-between items-center ">
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
                        className="  bg-no-repeat bg-cover bg-[url(https://i.ibb.co/zmbRY07/images.png)]"
                      />
                    </div>
                  </li>
                </ul>
              </nav>
              <button
                onClick={handleLogout}
                className="w-28 hidden md:flex items-center gap-1 text-white font-bold border-none btn bg-blue-500 hover:bg-gray-900  rounded-lg "
              >
                Log Out
                <MdLogout />
              </button>
            </div>
          ) : (
            <div>
              <div className="flex items-center gap-3 ">
                <Link to={'/login'}>
                  <button
                    className={`w-28 font-bold border-none focus:outline-none btn  ${
                      isScrolled
                        ? 'bg-[#01204E] text-white'
                        : 'bg-white text-black'
                    }  py-1 px-1 rounded-lg `}
                  >
                    <MdOutlineLogin /> Sign In
                  </button>
                </Link>
                <Link to={'/register'}>
                  <button className="w-28 md:flex items-center gap-1 hidden  bg-blue-500 text-white font-bold focus:outline-none border-none btn    py-1 px-1 rounded-lg">
                    <FaUserAlt /> Sign Up
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
