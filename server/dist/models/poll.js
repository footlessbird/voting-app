"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var optionSchema = new mongoose_1.Schema({
    option: String,
    votes: {
        type: Number,
        default: 0,
    },
});
var pollSchema = new mongoose_1.Schema({
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    question: String,
    options: [optionSchema],
    voted: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "User" }],
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
var Poll = mongoose_1.model("Poll", pollSchema);
exports.default = Poll;
