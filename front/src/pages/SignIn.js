import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Redux
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "../redux/userSlice";

const SignIn = () => {
  // Variables du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remenberMe, setRemenberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // State redux
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.user);

  useEffect(() => {
    if (userLogged.isAuthentificated) {
      if (remenberMe) {
        localStorage.setItem("token", userLogged.token);
      }
      // dispatch(getProfile(userLogged.token));
      navigate("/dashboard");
    }
  }, [userLogged, remenberMe, navigate, dispatch]);

  // if (userLogged.isAuthentificated) {
  // if (remenberMe) {
  //   localStorage.setItem("token", userLogged.token);
  // }
  //   dispatch(getProfile())
  //   navigate("/dashboard")
  // }

  const handleLogin = async () => {
    try {
      await dispatch(logIn({ email, password })).unwrap();
      console.log("Sign in ok, dispatch effectué");
    } catch (err) {
      setError(err);
    }

    // dispatch(logIn({ email, password }));
    // console.log(userLogged);

    // // Récupération des infos de l'utilisateur
    // const userDataProfile = await getUserProfile(userToken);
    // const userProfile = {};
    // userProfile.userFirstName = userDataProfile.body.firstName;
    // userProfile.userLastName = userDataProfile.body.lastName;
    // userProfile.userName = userDataProfile.body.userName;
    // console.log(userProfile);
    // dispatch({
    //   type: "user/getProfile",
    //   payload: userProfile,
    // });
    // navigate("/dashboard");
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
          {error && <p className="error">{error}</p>}
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
