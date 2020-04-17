import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
import passport from "passport";
import "./services/passport";
import routes from "./routes";

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();
const PORT = 5000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
  })
);

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", routes.auth);
app.use("/polls", routes.poll);

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
