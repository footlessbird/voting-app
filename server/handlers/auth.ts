const currentUser = (req, res, next) => {
  res.send(req.user);
};

const logout = (req, res) => {
  req.logout();
  res.redirect("/");
};

export default { currentUser, logout };
