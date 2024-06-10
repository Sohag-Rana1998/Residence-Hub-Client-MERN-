import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useRole from '../hooks/userRole';
import ScaleLoader from 'react-spinners/ScaleLoader';
import useAuth from '../hooks/useAuth';
const AgentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { loggedUser, isPending } = useRole();
  const location = useLocation();

  if (loading || isPending) {
    return (
      <div className="w-[80%] mx-auto min-h-screen flex justify-center items-center">
        <ScaleLoader color="#36d7b7" height={80} width={5} />
      </div>
    );
  } else if (user && loggedUser?.role === 'Agent') {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/"></Navigate>;
  }
};
AgentRoute.propTypes = {
  children: PropTypes.node,
};
export default AgentRoute;
