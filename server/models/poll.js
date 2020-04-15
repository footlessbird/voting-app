const mongoose = require("mongoose");
const { Schema } = mongoose;

const optionSchema = new Schema({
  option: String,
  votes: {
    type: Number,
    default: 0,
  },
});

const pollSchema = new Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  question: String,
  options: [optionSchema],
  voted: [{ type: Schema.Types.ObjectId, ref: "User" }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Poll", pollSchema);
