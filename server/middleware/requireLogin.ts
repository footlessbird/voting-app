export const requireLogin = (req, res, next) => {
  console.log("req.user in middleare ", req.user);
  if (!req.user) {
    return res.status(401).send({ error: "Please login to proceed" });
    // next(Error("Please login to proceed"));
  }
  next();
};
