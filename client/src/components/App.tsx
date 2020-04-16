import React, { useEffect } from "react";
import { connect } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { fetchUser } from "../actions/index";
import Header from "./Header";
import Landing from "./Landing";

function App({ fetchUser }: any) {
  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <div className="container">
      <Router>
        <Header />
        <Route exact path="/" component={Landing} />
      </Router>
    </div>
  );
}

// export default App;
export default connect(null, { fetchUser })(App);
