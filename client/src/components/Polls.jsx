import React, { useEffect } from "react";
import { useDispatch, useSelector, connect } from "react-redux";
import { getPolls, getUserPolls, getCurrentPoll } from "../actions";

// function Polls({ auth, polls, getPolls, getUserPolls }) {
function Polls() {
  const dispatch = useDispatch();
  const polls = useSelector((state) => state.polls.data);
  useEffect(() => {
    dispatch(getPolls());
    // getPolls();
  }, []);
  console.log("polls ", polls);
  const renderPolls =
    polls &&
    polls.map((poll) => (
      <li key={poll._id} onClick={() => dispatch(getCurrentPoll(poll._id))}>
        {poll.question}
      </li>
    ));

  return (
    <>
      <div>
        {/* <button onClick={getPolls}>All polls</button>
        <button onClick={getUserPolls}>My polls</button> */}
        <button onClick={() => dispatch(getPolls())}>All polls</button>
        <button onClick={() => dispatch(getUserPolls())}>My polls</button>
      </div>
      <ul>{renderPolls}</ul>
    </>
  );
}

// function mapStateToProps({ auth, polls }) {
//   return {
//     auth,
//     polls,
//   };
// }

// export default connect(mapStateToProps, { getPolls, getUserPolls })(Polls);

export default Polls;
