import { Link, NavLink, Outlet } from 'react-router-dom';
// import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
  // const { isAdmin } = useAdmin();
  // console.log(isAdmin);
  const admin = false;
  const agent = true;
  const user1 = false;
  return (
    <div className="flex h-screen    items-stretch  mx-auto">
      <div className="w-64 bg-[#1b71c7] text-white min-h-screen">
        <div className="flex justify-center p-4">
          <Link to={'/'}>
            <div className="">
              <h3 className="text-2xl font-extrabold tracking-[5.4px]">
                Heaven
              </h3>
              <h4 className="text-xl tracking-[5.4px]">Residence</h4>
            </div>
          </Link>
        </div>
        <ul className="menu px-3 mt-10">
          {admin && (
            <>
              <li className="mb-3">
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

              <li className="mb-3">
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
              <li className="mb-3">
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
              <li className="mb-3">
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
            </>
          )}
          {agent && (
            <>
              <li className="mb-3">
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
              <li className="mb-3">
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
              <li className="mb-3">
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
              <li className="mb-3">
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
              <li className="mb-3">
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
            </>
          )}

          {user1 && (
            <>
              <li className="mb-3">
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
              <li className="mb-3">
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
              <li className="mb-3">
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
              <li className="mb-3">
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

          <li className="mb-3">
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
          <li className="mb-3">
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
      <div className="flex-1  p-6 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
