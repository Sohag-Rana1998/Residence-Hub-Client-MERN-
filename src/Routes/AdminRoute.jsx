import { Navigate, useLocation } from "react-router-dom";
import PropTypes from "prop-types";
import useAuth from "../hooks/useAuth";
import useRole from "../hooks/userRole";
import Loader from "../components/Shared/Loader";
const AdminRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const { loggedUser, isPending } = useRole();
  const location = useLocation();

  if (loading || isPending) {
    return (
      <div>
        <Loader />
      </div>
    );
  } else if (user && loggedUser?.role === "Admin") {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/"></Navigate>;
  }
};
AdminRoute.propTypes = {
  children: PropTypes.node,
};
export default AdminRoute;
