import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { fetchUser, getCurrentPoll } from "../actions/index";
import Header from "./Header";
import Landing from "./Landing";
import CreatePoll from "./CreatePoll";
import Polls from "./Polls";
import Poll from "./Poll";

// function App({ fetchUser }) {
function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUser());
  }, []);

  return (
    <div className="container">
      <Router>
        <Header />
        <Switch>
          <Route exact path="/" component={Polls} />
          <Route
            exact
            path="/polls/:id"
            render={(props) => (
              <Poll getPoll={(id) => dispatch(getCurrentPoll(id))} {...props} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

// export default connect(null, { fetchUser })(App);
export default App;
