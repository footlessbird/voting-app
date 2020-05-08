"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var handlers_1 = __importDefault(require("../handlers"));
var requireLogin_1 = require("../middleware/requireLogin");
var router = express_1.Router();
var getPolls = handlers_1.default.getPolls, createPoll = handlers_1.default.createPoll, usersPolls = handlers_1.default.usersPolls, getPoll = handlers_1.default.getPoll, vote = handlers_1.default.vote, deletePoll = handlers_1.default.deletePoll;
router.route("/").get(getPolls).post(requireLogin_1.requireLogin, createPoll);
router.get("/user", requireLogin_1.requireLogin, usersPolls);
router
    .route("/:id")
    .get(getPoll)
    .post(requireLogin_1.requireLogin, vote)
    .delete(requireLogin_1.requireLogin, deletePoll);
exports.default = router;
