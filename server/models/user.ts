import { Schema, model, Document } from "mongoose";

export type IUser = Document & {
  googleId: string;
  email: string;
  polls: Schema.Types.ObjectId[];
};

const userSchema = new Schema({
  googleId: String,
  email: String,
  polls: [{ type: Schema.Types.ObjectId, ref: "Poll" }],
});

const User = model<IUser>("User", userSchema);

export default User;
