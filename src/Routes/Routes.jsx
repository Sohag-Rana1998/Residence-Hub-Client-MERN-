import { createBrowserRouter } from 'react-router-dom';
import Main from '../Layout/Main';
import ErrorPage from '../Pages/ErrorPage/ErrorPage';
import Home from '../Pages/Home/Home';
import SignUp from '../Pages/SignUp/SignUp';
import AllProperties from '../Pages/All Properties/AllProperties';
import Dashboard from '../Layout/Dashboard';
import SignIn from '../Pages/SignIn/SignIn';

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
        path: '/dashboard',
        element: <Dashboard />,
      },
    ],
  },
]);

export default router;
