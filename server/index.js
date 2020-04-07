require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

mongoose
  .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

require("./services/passport")(app);
require("./routes/auth")(app);

app.get("/", (req, res) => res.send("home"));

app.listen(PORT, () =>
  console.log(`Example app listening at http://localhost:${PORT}`)
);
