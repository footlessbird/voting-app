require("dotenv").config();
const passport = require("passport");
const cookieSession = require("cookie-session");
const GoogleStrategy = require("passport-google-oauth20").Strategy;

const User = require("../models/User");

module.exports = (app) => {
  app.use(
    cookieSession({
      maxAge: 30 * 24 * 60 * 60 * 1000,
      keys: [process.env.COOKIE_SECRET],
    })
  );

  app.use(passport.initialize());
  app.use(passport.session());

  // 첫번째 인자 user는 GoogleStrategy의 두번째 인자, 콜백 함수 내 done에서 전달된 user
  passport.serializeUser((user, done) => {
    // user.id는 몽고디비에서 자동으로 생성된 유니크한 아이디
    // googleId 대신 몽고디비에서 자동으로 생성된 아이디를 쓰는 이유는
    // 페이스북, 트위터 등 다른 oAuth를 사용할 경우
    // googleId: profile.id 를 쓸 수 없기 때문
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user);
  });

  passport.use(
    new GoogleStrategy(
      {
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        // callbackURL: process.env.CALLBACK_URL,
        callbackURL: "/auth/google/callback",
        proxy: true,
      },
      async function (accessToken, refreshToken, profile, done) {
        // find existing user
        const existingUser = await User.findOne({ googleId: profile.id });
        if (existingUser) {
          done(null, existingUser);
        } else {
          const newUser = await new User({ googleId: profile.id }).save();
          done(null, newUser);
        }
      }
    )
  );
};
