import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions";

function Header({ auth, logout }: any) {
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
                <a onClick={logout}>Logout</a>
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

function mapStateToProps({ auth }) {
  return {
    auth,
  };
}

export default connect(mapStateToProps, { logout })(Header);
