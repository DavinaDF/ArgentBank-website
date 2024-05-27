import { useSelector } from "react-redux";
import { PropTypes } from "prop-types";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.user.isAuthentificated);

  return isAuth ? children : <Navigate to="/signin" />;
};

PrivateRoute.propTypes = {
  children: PropTypes.node,
};

export default PrivateRoute;
