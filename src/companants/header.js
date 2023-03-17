//import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../features/userSlice";

export const Header = () => {
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  function signOut() {
    dispatch(logout());
  }

  return (
    <header>
      <div className="main-nav">
        <Link className="main-nav-logo" to={"/"}>
          <img
            className="main-nav-logo-image"
            src="./assets/img/argentBankLogo.png"
            alt="Argent Bank Logo"
          />
          <h1 className="sr-only">Argent Bank</h1>
        </Link>
        <nav>
          <Link
            className="main-nav-item"
            to={user.logged ? "/User" : "/SignIn"}
          >
            <i className="fa fa-user-circle"></i>
            {user.logged ? user.firstName : "SignIn"}
          </Link>
          {user.logged && (
            <Link className="main-nav-item" onClick={() => signOut()} to="/">
              <i className="fa fa-sign-out"></i>
              SignOut
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
};
