import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { logout } from "../actions";

function Header({ auth, logout }: any) {
  const { isLoading, isAuthenticated } = auth;
  console.log(isAuthenticated);

  return (
    <nav>
      <div className="menu-wrapper">
        <Link to={isAuthenticated ? "create" : "/"}>Create</Link>
        <div className="right">
          {isAuthenticated ? (
            <a onClick={logout}>Logout</a>
          ) : (
            <a href="/auth/google">Login With Google</a>
          )}
        </div>
      </div>
    </nav>
  );
}

function mapStateToProps({ auth }: any) {
  return {
    auth,
  };
}

export default connect(mapStateToProps, { logout })(Header);
