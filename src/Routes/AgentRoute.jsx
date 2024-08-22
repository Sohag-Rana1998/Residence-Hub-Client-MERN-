import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useRole from "../hooks/userRole";
import useAuth from "../hooks/useAuth";
import Loader from "../components/Shared/Loader";
const AgentRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { loggedUser, isPending } = useRole();
  const location = useLocation();

  if (loading || isPending) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else if (user && loggedUser?.role === "Agent") {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/"></Navigate>;
  }
};
AgentRoute.propTypes = {
  children: PropTypes.node,
};
export default AgentRoute;
