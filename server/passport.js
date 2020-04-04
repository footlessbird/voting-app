require("dotenv").config();

module.exports = function(app) {
  const passport = require("passport");
  const GoogleStrategy = require("passport-google-oauth20").Strategy;

  passport.serializeUser((user, done) => {
    done(null, user);
  });
  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: process.env.CALLBACK_URL
      },
      function(accessToken, refreshToken, profile, cb) {
        //   User.findOrCreate({ googleId: profile.id }, function(err, user) {
        //     return cb(err, user);
        //   });
        console.log(accessToken, refreshToken, profile, cb);
      }
    )
  );

  app.get(
    "/auth/google",
    passport.authenticate(
      "google",
      // { scope: ["profile"] },

      {
        scope: ["https://www.googleapis.com/auth/plus.login", "profile"]
      }
    )
  );

  app.get(
    "/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/login" }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect("/");
    }
  );

  return passport;
};
