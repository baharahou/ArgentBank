import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setBearer } from "../features/userAPI";
import { updateProfile, getSession, getProfile } from "../features/userSlice";

export const User = () => {
  const { firstName, lastName, logged } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [edit, setEdit] = useState(false);
  const [fname, setFirstname] = useState();
  const [lname, setLastname] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      dispatch(getSession(sessionStorage.getItem("token")));
      setBearer(sessionStorage.getItem("token"));

      dispatch(getProfile());
    }
    setFirstname(firstName);
    setLastname(lastName);
    if (!logged) {
      navigate("/SignIn");
    }
  }, [lastName, firstName, logged, navigate, dispatch]);
  function savechange() {
    dispatch(updateProfile({ fname, lname }));
    setEdit(false);
  }
  return (
    <main className="main bg-dark">
      {!edit && (
        <div className="header">
          <h1>
            Welcome back
            <br />
            {firstName + " " + lastName}!
          </h1>
          <button className="edit-button" onClick={() => setEdit(true)}>
            Edit Name
          </button>
        </div>
      )}
      {edit && (
        <div className="headeredit">
          <h1>Edit user name</h1>
          <div className="inputedit">
            <div className="input-wrapper">
              <label htmlFor="firstname">firstname</label>
              <input
                type="text"
                name="firstname"
                id="firstname"
                value={fname}
                onChange={(e) => setFirstname(e.target.value)}
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="lastrname">lastrname</label>
              <input
                type="text"
                name="lastname"
                id="lastrname"
                value={lname}
                onChange={(e) => setLastname(e.target.value)}
              />
            </div>
          </div>
          <div className="editbtn">
            <button className="edit-button" onClick={() => savechange()}>
              save
            </button>

            <button className="edit-button" onClick={() => setEdit(false)}>
              cancel
            </button>
          </div>
        </div>
      )}
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
    </main>
  );
};
