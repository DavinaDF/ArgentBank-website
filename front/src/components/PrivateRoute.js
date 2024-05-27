import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children }) => {
  const isAuth = useSelector((state) => state.user.isAuthentificated);

  return isAuth ? children : <Navigate to="/signin" />;
};

export default PrivateRoute;
