const Poll = require("../models/poll");

exports.getPolls = async (req, res, next) => {
  try {
    console.log("req.user in poll handler", req.user);
    // const polls = await Poll.find();
  } catch (err) {
    return next({
      status: 400,
      message: err.message,
    });
  }
};
