import { Schema, model } from "mongoose";

const userSchema = new Schema({
  googleId: String,
  email: String,
  polls: [{ type: Schema.Types.ObjectId, ref: "Poll" }],
});

const User = model("User", userSchema);

export default User;
