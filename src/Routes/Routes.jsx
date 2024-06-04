import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home';
import SignUp from '../Pages/SignUp/SignUp';
import AllProperties from '../Pages/All Properties/AllProperties';
import Dashboard from '../Layout/Dashboard';
import SignIn from '../Pages/SignIn/SignIn';
import AdminProfile from '../Pages/Dashboard/AdminDashboard/AdminProfile/AdminProfile';
import ManageProperties from '../Pages/Dashboard/AdminDashboard/ManageProperies/ManageProperties';
import ManageUsers from '../Pages/Dashboard/AdminDashboard/ManageUsers/ManageUsers';
import ManageReviews from '../Pages/Dashboard/AdminDashboard/ManageReviews/ManageReviews';
import AgentProfile from '../Pages/Dashboard/AgentsDashboard/AgentProfile/AgentProfile/AgentProfile';
import AddProperty from '../Pages/Dashboard/AgentsDashboard/AddProperty/AddProperty';
import MyAddedProperties from '../Pages/Dashboard/AgentsDashboard/MyAddedProperties/MyAddedProperties';
import RequestedProperties from '../Pages/Dashboard/AgentsDashboard/RequestedProperties/RequestedProperties';
import MySoldProperties from '../Pages/Dashboard/AgentsDashboard/MySoldProperties/MySoldProperties';
import UserProfle from '../Pages/Dashboard/UserDashboard/UserProfle/UserProfle';
import Wishlist from '../Pages/Dashboard/UserDashboard/WishList/Wishlist';
import PropertyBought from '../Pages/Dashboard/UserDashboard/PropertyBought/PropertyBought';
import MyReviews from '../Pages/Dashboard/UserDashboard/MyReviews/MyReviews';
import UpdateProperty from '../Pages/Dashboard/AgentsDashboard/UpdateProperty/UpdateProperty';
import AdvertiseProperty from '../Pages/Dashboard/AdminDashboard/AdvertiseProperty/AdvertiseProperty';
import ViewDetails from '../Pages/ViewDetails/ViewDetails';
import MakeOffer from '../Pages/Dashboard/UserDashboard/WishList/MakeOffer';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: '/all-properties',
        element: <AllProperties />,
      },
      {
        path: '/register',
        element: <SignUp />,
      },
      {
        path: '/login',
        element: <SignIn />,
      },
      {
        path: '/view-details/:id',
        element: <ViewDetails />,
      },
      {
        path: '/dashboard',
        element: <Dashboard />,
        children: [
          // User Routes

          {
            path: 'user-profile',
            element: <UserProfle />,
          },
          {
            path: 'wishlist',
            element: <Wishlist />,
          },
          {
            path: 'bought-properties',
            element: <PropertyBought />,
          },
          {
            path: 'my-reviews',
            element: <MyReviews />,
          },
          {
            path: 'wishlist/:id',
            element: <MakeOffer />,
          },

          // Agents routes

          {
            path: 'agent-profile',
            element: <AgentProfile />,
          },
          {
            path: 'add-property',
            element: <AddProperty />,
          },
          {
            path: 'added-properties',
            element: <MyAddedProperties />,
          },
          {
            path: 'requested-properties',
            element: <RequestedProperties />,
          },
          {
            path: 'sold-properties',
            element: <MySoldProperties />,
          },
          {
            path: 'added-properties/:id',
            element: <UpdateProperty />,
          },

          // Admin Routes
          {
            path: 'admin-profile',
            element: <AdminProfile />,
          },
          {
            path: 'manage-properties',
            element: <ManageProperties />,
          },
          {
            path: 'manage-users',
            element: <ManageUsers />,
          },
          {
            path: 'manage-reviews',
            element: <ManageReviews />,
          },
          {
            path: 'advertise-property',
            element: <AdvertiseProperty />,
          },
        ],
      },
    ],
  },
]);

export default router;
