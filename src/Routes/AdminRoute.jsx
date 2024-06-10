import { Navigate, useLocation } from 'react-router-dom';
import ScaleLoader from 'react-spinners/ScaleLoader';
import PropTypes from 'prop-types';
import useAuth from '../hooks/useAuth';
import useRole from '../hooks/userRole';
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { loggedUser, isPending } = useRole();
  const location = useLocation();

  if (loading || isPending) {
    return (
      <div className="w-[80%] mx-auto min-h-screen flex justify-center items-center">
        <ScaleLoader color="#36d7b7" height={80} width={5} />
      </div>
    );
  } else if (user && loggedUser?.role === 'Admin') {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/"></Navigate>;
  }
};
AdminRoute.propTypes = {
  children: PropTypes.node,
};
export default AdminRoute;
