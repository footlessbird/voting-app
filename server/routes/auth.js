/*
const passport = require("passport");

module.exports = (app) => {
  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"],
    })
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google"),
    (req, res) => {
      res.redirect("/polls");
    }
  );

  app.get("/api/logout", (req, res) => {
    console.log("logout route just hit");
    req.logout();
    res.redirect("/");
  });

  app.get("/api/current_user", (req, res) => {
    res.send(req.user);
    console.log("isAuthenticated", req.isAuthenticated());
    console.log("user in auth ", req.user);
  });
};
*/
const router = require("express").Router();
const passport = require("passport");
const handle = require("../handlers");

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

router.get("/current_user", handle.currentUser);
router.get("/logout", handle.logout);

module.exports = router;
