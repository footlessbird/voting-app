require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.log(err));

const passport = require("./passport")(app);

const authRouter = require("./routes/auth")(passport);

app.use("/auth", authRouter);

app.get("/", (req, res) => res.send("home"));

app.get("/login_error", (req, res) => {
  res.send("login error");
});

app.get("/login_success", (req, res) => {
  res.send("Welcome you're successfully logged in");
});

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
