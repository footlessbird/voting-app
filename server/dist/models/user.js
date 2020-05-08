"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var userSchema = new mongoose_1.Schema({
    googleId: String,
    email: String,
    polls: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Poll" }],
});
var User = mongoose_1.model("User", userSchema);
exports.default = User;
