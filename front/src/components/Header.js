import { NavLink, useNavigate } from "react-router-dom";
import logo from "../assets/img/argentBankLogo.png";

import { useSelector, useDispatch } from "react-redux";

const Header = () => {
  const userData = useSelector((state) => state.User);
  const isAuth = userData.isAuthentificated;
  const userName = userData.userProfile.userName;

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogOut = async () => {
    localStorage.removeItem("token");
    dispatch({
      type: "User/logOut",
    });
    navigate("/");
  };

  return (
    <div>
      {!isAuth && !userName && (
        <div className="main-nav">
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
        </div>
      )}
      {isAuth && (
        <div className="main-nav">
          <section className="header-login">
            <div>
              <NavLink to="/" className="main-nav-logo">
                <img src={logo} alt="Logo Argent Bank header" />
              </NavLink>
            </div>
            <section className="header-right">
              <div>
                <NavLink className="main-nav-item" to="/dashboard">
                  <i className="fa fa-user-circle"></i>
                  {userName}
                </NavLink>
              </div>

              <div
                onClick={(e) => {
                  e.preventDefault();
                  handleLogOut();
                }}
                className="main-nav-item"
                to="/"
              >
                <i className="fa fa-sign-out"></i>
                Sign Out
              </div>
            </section>
          </section>
        </div>
      )}
    </div>
  );
};

export default Header;
