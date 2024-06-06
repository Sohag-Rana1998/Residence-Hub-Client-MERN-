import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';

import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';

const PrivateRoute = ({ children }) => {
  const location = useLocation();

  const { user, loading } = useAuth();
  const [loading1, setLoading] = useState(true);
  useEffect(() => {
    setTimeout(setLoading, 500, false);
  }, []);

  if (loading || loading1) {
    return (
      <div className="w-[80%] mx-auto min-h-screen ">
        <progress className="progress w-56"></progress>
      </div>
    );
  } else if (user) {
    return children;
  } else {
    return <Navigate state={location.pathname} to="/login"></Navigate>;
  }
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};
export default PrivateRoute;
