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
import Payment from '../Pages/Dashboard/UserDashboard/PropertyBought/Payment';
import ReportedProperty from '../Pages/Dashboard/AdminDashboard/ReportedProperty/ReportedProperty';
import PrivateRoute from './PrivateRoute';
import AgentRoute from './AgentRoute';
import AdminRoute from './AdminRoute';
import ContactUs from '../Pages/ContactUs/ContactUs';

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
        element: (
          <PrivateRoute>
            <AllProperties />
          </PrivateRoute>
        ),
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
        element: (
          <PrivateRoute>
            <ViewDetails />
          </PrivateRoute>
        ),
      },
      {
        path: '/contact-us',
        element: <ContactUs />,
      },
      {
        path: '/dashboard',
        element: (
          <PrivateRoute>
            <Dashboard />
          </PrivateRoute>
        ),
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
          {
            path: 'bought-properties/:id',
            element: <Payment />,
          },

          // Agents routes

          {
            path: 'agent-profile',
            element: (
              <AgentRoute>
                <AgentProfile />
              </AgentRoute>
            ),
          },
          {
            path: 'add-property',
            element: (
              <AgentRoute>
                <AddProperty />
              </AgentRoute>
            ),
          },
          {
            path: 'added-properties',
            element: (
              <AgentRoute>
                <MyAddedProperties />
              </AgentRoute>
            ),
          },
          {
            path: 'requested-properties',
            element: (
              <AgentRoute>
                <RequestedProperties />
              </AgentRoute>
            ),
          },
          {
            path: 'sold-properties',
            element: (
              <AgentRoute>
                <MySoldProperties />
              </AgentRoute>
            ),
          },
          {
            path: 'added-properties/:id',
            element: (
              <AgentRoute>
                <UpdateProperty />
              </AgentRoute>
            ),
          },

          // Admin Routes
          {
            path: 'admin-profile',
            element: (
              <AdminRoute>
                <AdminProfile />
              </AdminRoute>
            ),
          },
          {
            path: 'manage-properties',
            element: (
              <AdminRoute>
                <ManageProperties />
              </AdminRoute>
            ),
          },
          {
            path: 'manage-users',
            element: (
              <AdminRoute>
                <ManageUsers />
              </AdminRoute>
            ),
          },
          {
            path: 'manage-reviews',
            element: (
              <AdminRoute>
                <ManageReviews />
              </AdminRoute>
            ),
          },
          {
            path: 'advertise-property',
            element: (
              <AdminRoute>
                <AdvertiseProperty />
              </AdminRoute>
            ),
          },
          {
            path: 'reported-properties',
            element: (
              <AdminRoute>
                <ReportedProperty />
              </AdminRoute>
            ),
          },
        ],
      },
    ],
  },
]);

export default router;
