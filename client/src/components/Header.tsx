import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions";
import { RootState } from "../reducers";

function Header() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const { isLoading, isAuthenticated, user } = auth;
  console.log(isAuthenticated);
  console.log("what is user now? ", user);

  return (
    <nav>
      <div className="nav-wrapper">
        <div className="nav-content">
          {isLoading ? (
            <div className="center">Loading..</div>
          ) : (
            <div className="right">
              {isAuthenticated && user !== "" ? (
                <a onClick={() => dispatch(logout())}>Logout</a>
              ) : (
                <a href="/auth/google">Login With Google</a>
              )}
            </div>
          )}
        </div>
        <Link to={isAuthenticated ? "create" : "/"}>Create</Link>
      </div>
    </nav>
  );
}

export default Header;
