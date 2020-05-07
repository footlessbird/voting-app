import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions";

function Header({ auth }) {
  const { isLoading, isAuthenticated, user } = auth;
  const dispatch = useDispatch();

  return (
    <header className="header">
      <div className="header-wrapper">
        <div className="header-content">
          {isLoading ? (
            <div className="center">Loading..</div>
          ) : (
            [
              <div>
                <Link className="header-brand" to="/">
                  Home
                </Link>
              </div>,
              <div className="header-item">
                {isAuthenticated && user !== "" ? (
                  <a onClick={() => dispatch(logout())}>Logout</a>
                ) : (
                  <a href="/auth/google">Login With Google</a>
                )}
              </div>,
            ]
          )}
        </div>
        {/* <Link to={isAuthenticated ? "create" : "/"}>Create</Link> */}
      </div>
    </header>
  );
}

export default Header;
