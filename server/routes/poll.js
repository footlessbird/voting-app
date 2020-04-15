const Poll = require("../models/poll");

module.exports = (app) => {
  app.get("/api/polls", async (req, res) => {
    console.log("user in poll ", req.user);
    try {
      const polls = await Poll.find();
      return res.status(200).json(polls);
    } catch (err) {
      return next({
        status: 400,
        message: err.message,
      });
    }
  });
};
