import { Navigate, useLocation } from 'react-router-dom';
import PropTypes from 'prop-types';
import useRole from '../hooks/userRole';
import useAuth from '../hooks/useAuth';
const AgentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { loggedUser, isPending } = useRole();
  const location = useLocation();

  if (loading || isPending) {
    return (
      <div className="w-[80%] mx-auto min-h-screen flex justify-center items-center">
        <progress className="progress w-56 mb-1"></progress>
        <progress className="progress w-56 mb-1"></progress>
        <progress className="progress w-56 mb-1"></progress>
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
