import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector, connect } from "react-redux";
import { vote, getCurrentPoll } from "../actions";
import { RootState } from "../reducers";
import { color } from "../services/color";

// type IProps = {
//   history: History<PoorMansUnknown>,
//   location: Location<PoorMansUnknown>,
//   match: match<any>,
//   staticContext?: StaticContext | undefined,
// };

function Poll(props) {
  const dispatch = useDispatch();
  console.log("props ", props);
  console.log(props.match.params.id);
  const { getPoll } = props;
  useEffect(() => {
    // dispatch(getCurrentPoll(props.match.params.id));
    getPoll(props.match.params.id);
  }, []);
  const poll = useSelector((state: RootState) => state.currentPoll);
  const options =
    poll.options &&
    poll.options.map((data) => (
      <button
        onClick={() => dispatch(vote(poll._id, { vote: data.option }))}
        className="button"
        key={data._id}
      >
        {data.option}
      </button>
    ));

  const chartData = poll.options && {
    labels: poll.options.map((optionData) => optionData.option),
    datasets: [
      {
        label: poll.question,
        backgroundColor: poll.options.map((option) => color()),
        borderColor: "#323643",
        data: poll.options.map((option) => option.votes),
      },
    ],
  };

  return (
    <div>
      <h3 className="poll-title">{poll.question}</h3>
      <div>{options}</div>
      <Pie data={chartData} />
    </div>
  );
}

export default Poll;
