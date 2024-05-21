import { NavLink } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";

import { useSelector } from "react-redux";

const Header = () => {
  console.log("ok header");
  const userData = useSelector((state) => state.User);
  const isAuth = userData.isAuthentificated;
  console.log(isAuth);

  return (
    <div className="main-nav">
      {!isAuth && (
        <section className="header-logout">
          <NavLink to="/" className="main-nav-logo">
            <img src={logo} alt="Logo Argent Bank header" />
          </NavLink>
          <div className="main-nav-item">
            <NavLink to="/signin">
              <i className="fa fa-user-circle"></i>
              Sign in
            </NavLink>
          </div>
        </section>
      )}
      {isAuth && (
        <section className="header-login">
          <NavLink className="main-nav-item" to="/dashboard">
            <i className="fa fa-user-circle"></i>
            Tony
          </NavLink>
          <NavLink className="main-nav-item" to="/dashboard">
            <i className="fa fa-sign-out"></i>
            Sign Out
          </NavLink>
        </section>
      )}
    </div>
  );
};

export default Header;
