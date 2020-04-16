exports.currentUser = (req, res, next) => {
  console.log("req.user in auth handler ", req.user);
  res.send(req.user);
  // res.status(200).json(req.user);
};

exports.logout = (req, res) => {
  req.logout();
  res.redirect("/");
};
