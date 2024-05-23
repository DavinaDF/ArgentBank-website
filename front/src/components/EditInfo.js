import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { editUsername } from "../fetch/api";

import { useSelector, useDispatch } from "react-redux";

const EditInfo = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.User);
  const userName = userData.userProfile.userName;
  const firstName = userData.userProfile.userFirstName;
  const lastName = userData.userProfile.userLastName;

  const [userNameEdited, setUserName] = useState(userName);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setUserName(e.target.value);
  };

  const handleSave = (e) => {
    setUserName(e.target.value);

    try {
      const responseEditUserName = editUsername(userNameEdited, userData.token);
      console.log(responseEditUserName);
      dispatch({
        type: "User/editProfile",
        payload: userNameEdited,
      });
      navigate("/dashboard");
    } catch (error) {
      setError("Votre pseudo n'a pas pu être modifié.");
    }
  };

  const handleCancel = () => {
    navigate("/dashboard");
  };

  return (
    <div>
      <section className="edit-form">
        <h1>Edit user info</h1>
        <form>
          {error && <p className="error">{error}</p>}
          <div className="edit-input-wrapper">
            <label>
              User name:
              <input
                type="text"
                id="userName"
                value={userNameEdited}
                onChange={(e) => {
                  e.preventDefault();
                  handleChange(e);
                }}
                required
              />
            </label>
          </div>
          <div className="edit-input-wrapper">
            <label>
              First name:
              <input type="text" id="firstName" value={firstName} disabled />
            </label>
          </div>
          <div className="edit-input-wrapper">
            <label>
              Last name:
              <input type="text" id="lastName" value={lastName} disabled />
            </label>
          </div>
          <button
            className="button-save"
            onClick={(e) => {
              e.preventDefault();
              handleSave(e);
            }}
          >
            Save
          </button>
          <button
            className="button-cancel"
            onClick={(e) => {
              e.preventDefault();
              handleCancel(e);
            }}
          >
            Cancel
          </button>
        </form>
      </section>
    </div>
  );
};

export default EditInfo;
