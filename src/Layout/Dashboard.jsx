import { Link, NavLink, Outlet } from 'react-router-dom';
import useRole from '../hooks/userRole';
// import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
  const { loggedUser } = useRole();
  console.log(loggedUser);
  return (
    <div className="flex h-screen pt-16   mx-auto">
      <div className="w-64 pt-5 bg-[#1b71c7]  text-white ">
        <div className=" px-4">
          <Link to={'/'}>
            <div className="flex justify-center flex-col items-center">
              <img
                className="h-16 w-16 rounded-full"
                src="https://i.postimg.cc/28Rn2bJ4/white-logo.png"
                alt=""
              />
              <h3 className="text-3xl font-extrabold tracking-[5.4px]">
                {"Heaven's"}
              </h3>
            </div>
          </Link>
        </div>
        <ul className="menu px-3 mt-10">
          {loggedUser?.role === 'Admin' && (
            <>
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
            </>
          )}
          {loggedUser?.role === 'Agent' ? (
            <>
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
            </>
          ) : (
            <></>
          )}

          {loggedUser?.role || (
            <>
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
            </>
          )}
          <div className="divider my-5"></div>

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
        </ul>
      </div>
      <div
        style={{ scrollbarWidth: 'none' }}
        className="flex-1    overflow-y-scroll  "
      >
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
