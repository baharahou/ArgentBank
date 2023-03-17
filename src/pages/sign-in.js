import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBearer } from "../features/userAPI";
import { authGetToken, getProfile, getSession } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

export const SignIn = () => {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (sessionStorage.getItem("token") != null) {
      dispatch(getSession(sessionStorage.getItem("token")));
      navigate("/User");
    }
  });
  const handelsubmit = async () => {
    await dispatch(authGetToken({ email, password }));
    setBearer(sessionStorage.getItem("token"));
    dispatch(getProfile());
    navigate("/User");
  };

  return (
    <main className="main bg-dark">
      {error && <div className="error">{error}</div>}
      <section className="sign-in-content">
        <i className="fa fa-user-circle sign-in-icon"></i>
        <h1>Sign In</h1>
        <div>
          <div className="input-wrapper">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="input-remember">
            <input type="checkbox" id="remember-me" />
            <label htmlFor="remember-me">Remember me</label>
          </div>

          <button className="sign-in-button" onClick={() => handelsubmit()}>
            Sign In
          </button>
        </div>
      </section>
    </main>
  );
};
