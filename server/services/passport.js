require("dotenv").config();
const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

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
