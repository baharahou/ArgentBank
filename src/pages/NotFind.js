import React from "react";
import { Link } from "react-router-dom";

export const NotFind = () => {
  return (
    <div className="notfind">
      <h1>Oops! You seem to be lost.</h1>
      <p>Here are some helpful links:</p>

      <Link to="/">
        <h4>Home</h4>
      </Link>
    </div>
  );
};
