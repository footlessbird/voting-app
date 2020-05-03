import Poll from "../models/poll";
import User from "../models/user";

const getPolls = async (req, res, next) => {
  try {
    // console.log("req.user in poll handler", req.user);
    const polls = await Poll.find();
    return res.status(200).json(polls);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const createPoll = async (req, res, next) => {
  console.log("This is createPoll on server");
  console.log("req.body ", req.body);
  const { question, options } = req.body;
  try {
    const user = req.user;
    const newPoll = await Poll.create({
      user,
      question,
      options: options.map((option) => ({ option, vote: 0 })),
    });
    console.log("newPoll ", newPoll);
    user.polls.push(newPoll.id);
    await user.save();
    return res.status(201).json(newPoll);
  } catch (err) {
    console.error(err);
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const usersPolls = async (req, res, next) => {
  console.log("usersPolls invoked");
  try {
    const myPolls = await Poll.find({ user: req.user.id });
    return res.status(200).json(myPolls);
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const getPoll = async (req, res, next) => {
  console.log("getPoll invoked");
  const pollId = req.params.id.toString();
  try {
    console.log("pollId", req.params.id);
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error("No such poll found");
    console.log("poll ", poll);
    return res.status(200).json(poll);
  } catch (err) {
    console.error(err);
    return next({
      status: 400,
      message: err.message,
    });
  }
};

const vote = async (req, res, next) => {
  const pollId = req.params.id.toString();
  const { vote } = req.body;
  // try {
  if (vote) {
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error("No such poll found");

    const votedOption = poll.options.map((data) =>
      data.option === vote
        ? {
            option: data.option,
            votes: data.votes + 1,
          }
        : data
    );

    if (
      poll.voted.filter((user) => user.toString() === req.user.id).length <= 0
    ) {
      poll.voted.push(req.user.id);
      poll.options = votedOption;
      await poll.save();
      return res.status(202).json(poll);
    } else {
      // throw new Error("Already voted");
      console.log("already voted");
      return res.status(400).json("Already voted");
    }
  } else {
    // throw new Error("No vote provided");
    console.log("no vote provided");
    return res.status(400).json("No vote provided");
  }
  // } catch (err) {
  // return next({
  //   status: 400,
  //   message: err.message,
  // });
  // }
};

const deletePoll = async (req, res, next) => {
  const pollId = req.params.id.toString();
  const { user } = req;
  try {
    if (user.polls) {
      user.polls = user.polls.filter((userPoll) => {
        return userPoll.id.toString() !== pollId.toString();
      });
    }
    const poll = await Poll.findById(pollId);
    if (!poll) throw new Error("No such poll found");
    if (poll.user.toString() !== user.id) {
      throw new Error("Unauthorized access");
    }
    await user.save();
    await poll.remove();
    return res.status(202).json({ poll, deleted: true });
  } catch (err) {
    return next({
      status: 400,
      messasge: err.message,
    });
  }
};

export default { getPolls, createPoll, usersPolls, getPoll, vote, deletePoll };
