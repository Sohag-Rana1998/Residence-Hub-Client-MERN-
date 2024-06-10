import PropTypes from 'prop-types';
import { useEffect, useState } from 'react';
import ScaleLoader from 'react-spinners/ScaleLoader';
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
      <div className="w-[80%] mx-auto flex justify-center items-center min-h-screen ">
        <ScaleLoader color="#36d7b7" height={80} width={5} />
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
