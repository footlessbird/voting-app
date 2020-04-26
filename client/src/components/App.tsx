import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fetchUser } from "../actions/index";
import Header from "./Header";
import Landing from "./Landing";
import CreatePoll from "./CreatePoll";
import Polls from "./Polls";

function App({ fetchUser }) {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container">
      <Router>
        <Header />
        <Route exact path="/" component={Polls} />
        {/* <Route exact path="/" component={CreatePoll} /> */}
      </Router>
    </div>
  );
}

export default connect(null, { fetchUser })(App);
