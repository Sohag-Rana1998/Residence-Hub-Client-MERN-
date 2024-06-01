import {
  FaAd,
  FaBook,
  FaHome,
  FaShoppingBag,
  FaShoppingCart,
  FaUtensils,
} from 'react-icons/fa';
import {
  FaCalendar,
  FaEnvelope,
  FaList,
  FaPeopleGroup,
  FaWallet,
} from 'react-icons/fa6';
import { Link, NavLink, Outlet } from 'react-router-dom';
// import useAdmin from '../hooks/useAdmin';

const Dashboard = () => {
  // const { isAdmin } = useAdmin();
  // console.log(isAdmin);
  const admin = true;
  return (
    <div className="flex  items-start  mx-auto">
      <div className="w-64 bg-[#d1a054] min-h-screen">
        <div className="flex justify-center p-4">
          <Link to={'/'}>
            <div className="">
              <h3 className="text-2xl font-extrabold">BISTRO BOSS</h3>
              <h4 className="text-xl tracking-[5.4px]">Restaurant</h4>
            </div>
          </Link>
        </div>
        <ul className="menu px-3 mt-10">
          {admin ? (
            <>
              <li className="mb-3">
                <NavLink
                  to={'/dashboard/admin-home'}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                      : isPending
                      ? 'pending'
                      : ''
                  }
                >
                  <FaHome />
                  Admin Home
                </NavLink>
              </li>

              <li className="mb-3">
                <NavLink
                  to={'/dashboard/add-items'}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                      : isPending
                      ? 'pending'
                      : ''
                  }
                >
                  <FaUtensils />
                  Add Items
                </NavLink>
              </li>
              <li className="mb-3">
                <NavLink
                  to={'/dashboard/manage-items'}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                      : isPending
                      ? 'pending'
                      : ''
                  }
                >
                  <FaList />
                  Manage Items
                </NavLink>
              </li>
              <li className="mb-3">
                <NavLink
                  to={'/dashboard/manage-bookings'}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                      : isPending
                      ? 'pending'
                      : ''
                  }
                >
                  <FaBook />
                  Manage Booking
                </NavLink>
              </li>

              <li className="mb-3">
                <NavLink
                  to={'/dashboard/all-users'}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                      : isPending
                      ? 'pending'
                      : ''
                  }
                >
                  <FaPeopleGroup />
                  All Users
                </NavLink>
              </li>
            </>
          ) : (
            <>
              <li className="mb-3">
                <NavLink
                  to={'/dashboard/user-home'}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                      : isPending
                      ? 'pending'
                      : ''
                  }
                >
                  <FaHome />
                  User Home
                </NavLink>
              </li>
              <li className="mb-3">
                <NavLink
                  to={'/dashboard/my-cart'}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                      : isPending
                      ? 'pending'
                      : ''
                  }
                >
                  <FaShoppingCart />
                  My Cart
                </NavLink>
              </li>
              <li className="mb-3">
                <NavLink
                  to={'/dashboard/reservation'}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                      : isPending
                      ? 'pending'
                      : ''
                  }
                >
                  <FaCalendar />
                  RESERVATION
                </NavLink>
              </li>
              <li className="mb-3">
                <NavLink
                  to={'/dashboard/payment-history'}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                      : isPending
                      ? 'pending'
                      : ''
                  }
                >
                  <FaWallet />
                  PAYMENT HISTORY
                </NavLink>
              </li>
              <li className="mb-3">
                <NavLink
                  to={'/dashboard/add-review'}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                      : isPending
                      ? 'pending'
                      : ''
                  }
                >
                  <FaAd />
                  ADD REVIEW
                </NavLink>
              </li>
              <li className="mb-3">
                <NavLink
                  to={'/dashboard/my-bookings'}
                  className={({ isActive, isPending }) =>
                    isActive
                      ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                      : isPending
                      ? 'pending'
                      : ''
                  }
                >
                  <FaList />
                  MY BOOKING
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
                  ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              <FaHome />
              HOME
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to={'/our-menu'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              <FaList />
              Menu
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to={'/our-shop'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              <FaShoppingBag />
              SHOP
            </NavLink>
          </li>
          <li className="mb-3">
            <NavLink
              to={'/contact-us'}
              className={({ isActive, isPending }) =>
                isActive
                  ? 'border-2 w-full bg-gray-400 font-bold text-[#EEFF25]'
                  : isPending
                  ? 'pending'
                  : ''
              }
            >
              <FaEnvelope />
              CONTACT
            </NavLink>
          </li>
        </ul>
      </div>
      <div className="flex-1 py-10 mx-6">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
