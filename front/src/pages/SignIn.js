import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { logIn, getProfile } from "../redux/userSlice";

const SignIn = () => {
  // Variables du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remenberMe, setRemenberMe] = useState(false);
  const navigate = useNavigate();

  // State redux
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user);

  useEffect(() => {
    if (userLogged.isAuthentificated) {
      if (remenberMe) {
        localStorage.setItem("token", userLogged.token);
      }

      dispatch(getProfile(userLogged.token));
      navigate("/dashboard");
    }
  }, [userLogged, remenberMe, navigate, dispatch]);

  const handleLogin = () => {
    dispatch(logIn({ email, password }));
  };

  return (
    <div className="main main-signin">
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleLogin();
          }}
        >
          {userLogged.requestError && (
            <p className="error">{userLogged.requestError}</p>
          )}
          <div className="input-wrapper">
            <label>
              Email
              <input
                type="email"
                id="userEmail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="input-wrapper">
            <label>
              Password
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </label>
          </div>
          <div className="input-remember">
            <label>
              <input
                type="checkbox"
                id="remember-me"
                checked={remenberMe}
                onChange={(e) => setRemenberMe(e.target.checked)}
              />
              Remember me
            </label>
          </div>
          <button className="sign-in-button">Sign In</button>
        </form>
      </section>
    </div>
  );
};

export default SignIn;
