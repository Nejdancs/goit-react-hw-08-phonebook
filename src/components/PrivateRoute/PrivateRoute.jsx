import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ redirect, children }) => {
  const isLoggedIn = useSelector(state => state.auth.isLoggedIn);

  return isLoggedIn ? children : <Navigate to={redirect} />;
};

export default PrivateRoute;

PrivateRoute.propTypes = {
  redirect: PropTypes.string.isRequired,
};
