import Poll from "../models/poll";

const getPolls = async (req, res, next) => {
  try {
    console.log("req.user in poll handler", req.user);
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

export default { getPolls, createPoll };
