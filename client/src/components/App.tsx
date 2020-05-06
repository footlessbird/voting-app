import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from "react-router-dom";

import { fetchUser, getCurrentPoll } from "../actions";

import Header from "./Header";
import CreatePoll from "./CreatePoll";
import Polls from "./Polls";
import Poll from "./Poll";
import RequireLogin from "./RequireLogin";
import ErrorMessage from "./ErrorMessage";
import { RootState } from "../reducers";

function App() {
  const dispatch = useDispatch();
  const auth = useSelector((state: RootState) => state.auth);
  const { isAuthenticated } = auth;

  useEffect(() => {
    dispatch(fetchUser());
  }, []);
  console.log("R u authenticated? ", isAuthenticated);
  return (
    <div className="container">
      <Router>
        <Header auth={auth} />
        <ErrorMessage />
        <Switch>
          <Route
            exact
            path="/"
            render={() => <Polls isAuthenticated={isAuthenticated} />}
          />
          <Route
            exact
            path="/poll/new"
            render={() => (isAuthenticated ? <CreatePoll /> : <RequireLogin />)}
          />
          <Route
            exact
            path="/poll/:id"
            render={(props) => (
              <Poll getPoll={(id) => dispatch(getCurrentPoll(id))} {...props} />
            )}
          />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
