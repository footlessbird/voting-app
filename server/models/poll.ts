import { Schema, model, Document } from "mongoose";
import { IUser } from "./user";

type IOption = {
  option: string;
  votes: number;
};

export type IPoll = Document & {
  user: IUser;
  question: string;
  options: IOption[];
  voted: Schema.Types.ObjectId[];
  createdAt: string;
};

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

const Poll = model<IPoll>("Poll", pollSchema);
export default Poll;
