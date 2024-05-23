import EditInfo from "../components/EditInfo";
import AccountPreview from "../components/AccountPreview";
import { useState } from "react";

import { useSelector } from "react-redux";

const Dashboard = () => {
  // Pour faire apparaître le formulaire
  const [isVisible, setIsVisible] = useState(true);
  const [formVisible, setFormVisible] = useState(false);

  const userData = useSelector((state) => state.User);
  console.log(userData);

  const handleDisplayEditForme = () => {
    setFormVisible(!formVisible);
    setIsVisible(!isVisible);
  };

  return (
    <div className="main main-dashboard">
      <div className={`header ${isVisible ? "show" : ""}`}>
        <h1>
          Welcome back
          <br />
          {userData.userProfile.userName}
        </h1>
        <button className="edit-button" onClick={handleDisplayEditForme}>
          Edit Name
        </button>
      </div>
      <div className={`edit-content ${formVisible ? "animate" : ""}`}>
        <EditInfo />
      </div>
      <h2 className="sr-only">Accounts</h2>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Checking (x8349)</h3>
          <p className="account-amount">$2,082.79</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Savings (x6712)</h3>
          <p className="account-amount">$10,928.42</p>
          <p className="account-amount-description">Available Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
      <section className="account">
        <div className="account-content-wrapper">
          <h3 className="account-title">Argent Bank Credit Card (x8349)</h3>
          <p className="account-amount">$184.30</p>
          <p className="account-amount-description">Current Balance</p>
        </div>
        <div className="account-content-wrapper cta">
          <button className="transaction-button">View transactions</button>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
