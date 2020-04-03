const express = require("express");
const router = express.Router();

module.exports = function(passport) {
  router.get(
    "/login",
    passport.authenticate("google", {
      failureRedirect: "/login_error",
      successRedirect: "/login_success"
    })
  );
  return router;
};
