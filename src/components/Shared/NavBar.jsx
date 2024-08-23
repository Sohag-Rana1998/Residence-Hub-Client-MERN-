import { Avatar } from "@material-tailwind/react";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { MdOutlineLogin } from "react-icons/md";
import { FaUserAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import { MdLogout } from "react-icons/md";
import useAuth from "../../hooks/useAuth";
import useRole from "../../hooks/userRole";
import Loader from "./Loader";
import { RxCross2 } from "react-icons/rx";
import { GiHamburgerMenu } from "react-icons/gi";
const NavBar = () => {
  const { loggedUser } = useRole();
  const { user, logOut } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();
  const showDashboardLink = location.pathname.includes("/dashboard");
  const [loading, setLoading] = useState(true);
  const [menuToggle, setMenuToggle] = useState(false);

  useEffect(() => {
    setTimeout(setLoading, 500, false);
  }, []);
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.pageYOffset;
      setIsScrolled(scrollPosition > 50); // Adjust scroll threshold (default 50px)
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll); // Cleanup
  }, []);

  const handleLogout = () => {
    logOut()
      .then((result) => {
        console.log(result);
        Swal.fire({
          icon: "success",
          title: "Log Out successful",
          showConfirmButton: false,
          timer: 1500,
        });
      })
      .catch((error) => {
        console.error(error.message);
      });
    // console.log(user);
  };

  // Common Links
  const links = [
    { path: "/", title: "Home" },
    { path: "/all-properties", title: "All Properties" },
    {
      path: `${
        (loggedUser?.role === "Admin" && "/dashboard/admin-profile") ||
        (loggedUser?.role === "Agent" && "/dashboard/agent-profile") ||
        "/dashboard/user-profile"
      }`,
      title: "Dashboard",
    },
    {
      path: "/contact-us",
      title: "Contact Us",
    },
  ];

  //  Links for specific role;
  const adminLinks = [
    {
      path: "/dashboard/admin-profile",
      title: "Admin Profile",
    },

    {
      path: "/dashboard/manage-properties",
      title: "Manage Properties",
    },
    {
      path: "/dashboard/advertise-property",
      title: "Advertise Properties",
    },
    {
      path: "/dashboard/manage-users",
      title: "Manage Users",
    },
    {
      path: "/dashboard/manage-reviews",
      title: "Manage Reviews",
    },
    {
      path: "/dashboard/reported-properties",
      title: "Reported Property",
    },
  ];

  const agentLinks = [
    {
      path: "/dashboard/agent-profile",
      title: "Agent Profile",
    },
    {
      path: "/dashboard/add-property",
      title: "Add Property",
    },
    {
      path: "/dashboard/added-properties",
      title: "My Added Properties",
    },
    {
      path: "/dashboard/requested-properties",
      title: "Requested Properties",
    },
    {
      path: "/dashboard/sold-properties",
      title: "My Sold Properties",
    },
  ];

  const userLinks = [
    {
      path: "/dashboard/user-profile",
      title: "My Profile",
    },
    {
      path: "/dashboard/wishlist",
      title: "Wishlist",
    },
    {
      path: "/dashboard/bought-properties",
      title: "Property Bought",
    },
    {
      path: "/dashboard/my-reviews",
      title: "My-Reviews",
    },
  ];

  //  links when enter into dashboard
  const dashboardLinks = (loggedUser?.role === "Admin" && [
    ...links,
    ...adminLinks,
  ]) ||
    (loggedUser?.role === "Agent" && [...links, ...agentLinks]) ||
    loggedUser?.role || [...links, ...userLinks];

  // Toggle links when in dashboard or not in dashboard
  const smallDeviceDashboardLinks = showDashboardLink ? dashboardLinks : links;

  return loading ? (
    <div>
      <Loader />
    </div>
  ) : (
    <div
      className={`flex mx-auto fixed top-0  w-full   py-2 transition duration-300 ease-in-out ${
        isScrolled ? "bg-white text-black" : "bg-transparent text-blue-500"
      } justify-between ease-in-out items-center z-50 mx-auto  ${
        location.pathname === "/" ? "border-b-2" : ""
      }`}
    >
      <div className="flex items-center justify-center pl-2">
        <div className="block lg:hidden">
          <div className="dropdown">
            <div
              onClick={() => setMenuToggle(!menuToggle)}
              tabIndex={0}
              role="button"
              className="btn btn-ghost lg:hidden"
            >
              {menuToggle ? (
                <>
                  <RxCross2 className="text-3xl" />
                </>
              ) : (
                <>
                  <GiHamburgerMenu className="text-3xl" />
                </>
              )}
            </div>
            <ul
              tabIndex={0}
              className={`menu menu-sm absolute mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-48 ${
                menuToggle ? "block" : "hidden"
              }`}
            >
              {smallDeviceDashboardLinks?.map((link, index) => (
                <li key={index} onClick={() => setMenuToggle(!menuToggle)}>
                  <Link to={link?.path}>{link?.title}</Link>
                </li>
              ))}
              <div className="mt-2 block md:hidden">
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
                    <></>
                  )}
                </div>
              </div>
            </ul>
          </div>
        </div>

        <Link to={"/"} className="h-full">
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
        <ul className="menu menu-horizontal px-1 ">
          {" "}
          {links?.map((link, index) => (
            <li key={index} className="mr-[3px]">
              <Link
                to={link?.path}
                className={`${
                  location.pathname === link.path
                    ? "font-bold border border-blue-500 !bg-transparent"
                    : ""
                }`}
              >
                {link?.title}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div className=" pr-2 lg:pr-4 flex">
        {user ? (
          <div className="flex gap-2 justify-between items-center ">
            <nav className="relative parent ">
              <ul className="flex items-start gap-2">
                <li>
                  <div className="flex  items-center gap-2">
                    <h2 className="font-bold ">{user?.displayName || ""}</h2>
                    <Avatar
                      src={
                        (user && user?.photoURL) ||
                        "https://i.ibb.co/zmbRY07/images.png"
                      }
                      className="  bg-no-repeat bg-cover bg-[url(https://i.ibb.co/zmbRY07/images.png)] "
                    />
                  </div>
                </li>
              </ul>
            </nav>
            <button
              onClick={handleLogout}
              className="w-28 md:flex hidden items-center gap-1 text-white font-bold border-none btn bg-blue-500 hover:bg-gray-900  rounded-lg "
            >
              Log Out
              <MdLogout />
            </button>
          </div>
        ) : (
          <div>
            <div className="flex items-center gap-0 md:gap-3 ">
              <Link to={"/login"}>
                <button
                  className={`w-28 font-bold border-none focus:outline-none btn  ${
                    isScrolled
                      ? "bg-[#01204E] text-white"
                      : "bg-white text-black"
                  }  py-1 px-1 rounded-lg `}
                >
                  <MdOutlineLogin /> Sign In
                </button>
              </Link>
              <Link to={"/register"}>
                <button className="w-28 md:flex items-center gap-1 hidden  bg-blue-500 text-white font-bold focus:outline-none border-none btn  hover:bg-[#01204E]  py-1 px-1 rounded-lg">
                  <FaUserAlt /> Sign Up
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
