import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { logInUser, getUserProfile } from "../fetch/api";

// Redux
import { useSelector, useDispatch } from "react-redux";

const SignIn = () => {
  // Variables du formulaire
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remenberMe, setRemenberMe] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // State redux
  const dispatch = useDispatch();
  const userLogged = useSelector((state) => state.User);

  const handleLogin = async () => {
    try {
      // Fonction pour api connexion avec mail et mdp
      const userDataLog = await logInUser(email, password);
      const userToken = userDataLog.body.token;
      dispatch({
        type: "User/logIn",
        payload: userToken,
      });
      if (remenberMe) {
        localStorage.setItem("token", userToken);
      }

      console.log(userLogged);

      // Récupération des infos de l'utilisateur
      const userDataProfile = await getUserProfile(userToken);
      const userProfile = {};
      userProfile.userFirstName = userDataProfile.body.firstName;
      userProfile.userLastName = userDataProfile.body.lastName;
      userProfile.userName = userDataProfile.body.userName;
      console.log(userProfile);
      dispatch({
        type: "User/setProfile",
        payload: userProfile,
      });
      navigate("/dashboard");
    } catch (error) {
      setError("Les identifiants sont incorrects.");
    }
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
          {/* <!-- PLACEHOLDER DUE TO STATIC SITE --> */}
          {/* <a href="./dashboard" class="sign-in-button">
            Sign In
          </a> */}
          {/* <!-- SHOULD BE THE BUTTON BELOW -->
          <!-- <button class="sign-in-button">Sign In</button> -->
          <!--  --> */}
        </form>
      </section>
    </div>
  );
};

export default SignIn;
