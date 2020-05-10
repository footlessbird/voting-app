import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cookieSession from "cookie-session";
import mongoose from "mongoose";
import passport from "passport";
import "./services/passport";
import routes from "./routes";
import path from "path";

type IResponse = {
  [key: string]: any;
};

type IError = {
  [key: string]: any;
};

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const app = express();
const PORT = process.env.PORT || 5000;
const clientBuildDir = __dirname + "/../client/build/";

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

/*
app.use((req, res, next) => {
  let err: IError = new Error("Not Found 🤔");
  err.status = 404;
  next(err);
  // res.status(404).send("Page not found 🤔");
});
*/

// err는 핸들러내 api 함수들 try/catch(err)에서 넘어온 친구
app.use((err, req, res, next) => {
  res.status(err.status || 500).json({
    success: false,
    error: {
      message: err.message || "Something went wrong.",
    },
  });
});

if (process.env.NODE_ENV === "production") {
  // app.use(express.static(clientBuildDir));
  // app.use(express.static(path.join(__dirname, "..", "client/build")));
  // app.use(express.static(path.join(__dirname, "/../client/build")));
  console.log("production logic");

  /*
  app.get("*", (req, res) => {
    // res.sendFile(path.resolve(clientBuildDir, "index.html"));
    // res.sendFile(path.join(__dirname, "/../client/build", "index.html"));
    res.sendFile(path.resolve(clientDistDir, 'index.html'));
  });
}
*/

  app.use(express.static("client/build"));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

app.listen(PORT, () => {
  console.log("env is ", process.env.NODE_ENV);
  console.log(`Example app listening at http://localhost:${PORT}`);
});
