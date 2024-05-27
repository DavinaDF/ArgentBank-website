import AccountPreview from "../components/AccountPreview";
import accounts from "../data/accounts.json";
import { editUsername } from "../fetch/api";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";

const Dashboard = () => {
  const dispatch = useDispatch();

  // Récupération du state
  const userData = useSelector((state) => state.user);
  console.log(userData);

  // On met la liste des comptes dans un tableau
  const listAccount = accounts.accounts;

  // Pour faire apparaître le formulaire
  const [headerVisible, setHeaderVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);
  // State champ formulaire
  const [userNameEdited, setUserName] = useState(userData.userProfile.userName);
  const [error, setError] = useState("");

  // Apparition formulaire edit
  const handleDisplayEditForm = () => {
    setFormVisible(!formVisible);
    setHeaderVisible(!headerVisible);
  };

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSave = (e) => {
    setUserName(e.target.value);

    try {
      const responseEditUserName = editUsername(userNameEdited, userData.token);
      console.log(responseEditUserName);
      dispatch({
        type: "user/editProfile",
        payload: userNameEdited,
      });
      handleDisplayEditForm();
    } catch (error) {
      setError("Votre pseudo n'a pas pu être modifié.");
    }
  };

  const handleCancel = () => {
    handleDisplayEditForm();
    // navigate("/dashboard");
  };

  return (
    <div className="main main-dashboard">
      <div className={`header-dashboard ${headerVisible ? "" : "hide"}`}>
        <h1>
          Welcome back
          <br />
          {userData.userProfile.userName}
        </h1>
        <button className="edit-button" onClick={handleDisplayEditForm}>
          Edit Name
        </button>
      </div>
      <div className={`edit-content ${formVisible ? "show" : ""}`}>
        <section className="edit-form">
          <h1>Edit user info</h1>
          <form>
            {error && <p className="error">{error}</p>}
            <div className="edit-input-wrapper">
              <label>User name:</label>
              <input
                type="text"
                id="userName"
                // value={userNameEdited}
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                }}
                required
              />
            </div>
            <div className="edit-input-wrapper">
              <label>First name:</label>
              <input
                type="text"
                id="firstName"
                // value={userData.userProfile.userFirstName}
                disabled
              />
            </div>
            <div className="edit-input-wrapper">
              <label>Last name:</label>
              <input
                type="text"
                id="lastName"
                // value={userData.userProfile.userLastName}
                disabled
              />
            </div>
            <div className="buttons">
              <button
                className="edit-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleSave(e);
                }}
              >
                Save
              </button>
              <button
                className="edit-button"
                onClick={(e) => {
                  e.preventDefault();
                  handleCancel(e);
                }}
              >
                Cancel
              </button>
            </div>
          </form>
        </section>
      </div>
      <h2 className="sr-only">Accounts</h2>
      {listAccount.map((account, index) => (
        <AccountPreview
          key={index}
          title={account.title}
          amount={account.amount}
          description={account.description}
        />
      ))}
    </div>
  );
};

export default Dashboard;
