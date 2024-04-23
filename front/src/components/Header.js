import { NavLink } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";

const Header = () => {
  return (
    <div className="main-nav">
      <NavLink to="/" className="main-nav-logo">
        <img src={logo} alt="Logo Argent Bank header" />
      </NavLink>
      <div className="main-nav-item">
        <NavLink to="/signin">
          <i className="fa fa-user-circle"></i>
          Sign in
        </NavLink>
      </div>
    </div>
  );
};

export default Header;
