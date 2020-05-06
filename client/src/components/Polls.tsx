import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { Link } from "react-router-dom";
import { getPolls, getUserPolls, getCurrentPoll } from "../actions";
import { RootState } from "../reducers";

function Polls({ isAuthenticated }) {
  const dispatch = useDispatch();
  const polls = useSelector((state: RootState) => state.polls);

  useEffect(() => {
    dispatch(getPolls());
  }, []);
  console.log("polls ", polls);
  const renderPolls =
    polls &&
    polls.map((poll) => (
      <li key={poll._id} onClick={() => dispatch(getCurrentPoll(poll._id))}>
        <Link to={`/poll/${poll._id}`}>{poll.question}</Link>
      </li>
    ));

  return (
    <>
      <div>
        {isAuthenticated ? (
          <button>
            <Link to="poll/new">New</Link>
          </button>
        ) : null}

        <button onClick={() => dispatch(getPolls())}>All polls</button>
        {isAuthenticated ? (
          <button onClick={() => dispatch(getUserPolls())}>My polls</button>
        ) : null}
      </div>
      <ul>{renderPolls}</ul>
    </>
  );
}

export default Polls;
