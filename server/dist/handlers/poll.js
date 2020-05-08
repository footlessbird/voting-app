"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var poll_1 = __importDefault(require("../models/poll"));
var getPolls = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var polls, err_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 2, , 3]);
                return [4 /*yield*/, poll_1.default.find()];
            case 1:
                polls = _a.sent();
                console.log("getPolls invoked");
                return [2 /*return*/, res.status(200).json(polls)];
            case 2:
                err_1 = _a.sent();
                console.log("getPolls err ", err_1);
                return [2 /*return*/, next({
                        status: 400,
                        message: err_1.message,
                    })];
            case 3: return [2 /*return*/];
        }
    });
}); };
var createPoll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, question, options, user, newPoll, err_2;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                console.log("This is createPoll on server");
                console.log("req.body ", req.body);
                _a = req.body, question = _a.question, options = _a.options;
                _b.label = 1;
            case 1:
                _b.trys.push([1, 4, , 5]);
                user = req.user;
                return [4 /*yield*/, poll_1.default.create({
                        user: user,
                        question: question,
                        options: options.map(function (option) { return ({ option: option, vote: 0 }); }),
                    })];
            case 2:
                newPoll = _b.sent();
                console.log("newPoll ", newPoll);
                user.polls.push(newPoll.id);
                return [4 /*yield*/, user.save()];
            case 3:
                _b.sent();
                return [2 /*return*/, res.status(201).json(newPoll)];
            case 4:
                err_2 = _b.sent();
                console.error(err_2);
                return [2 /*return*/, next({
                        status: 400,
                        message: err_2.message,
                    })];
            case 5: return [2 /*return*/];
        }
    });
}); };
var usersPolls = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var myPolls, err_3;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("usersPolls invoked");
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                return [4 /*yield*/, poll_1.default.find({ user: req.user.id })];
            case 2:
                myPolls = _a.sent();
                return [2 /*return*/, res.status(200).json(myPolls)];
            case 3:
                err_3 = _a.sent();
                return [2 /*return*/, next({
                        status: 400,
                        message: err_3.message,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var getPoll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pollId, poll, err_4;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("getPoll invoked");
                pollId = req.params.id.toString();
                _a.label = 1;
            case 1:
                _a.trys.push([1, 3, , 4]);
                console.log("pollId", req.params.id);
                return [4 /*yield*/, poll_1.default.findById(pollId)];
            case 2:
                poll = _a.sent();
                if (!poll)
                    throw new Error("No such poll found");
                // console.log("poll ", poll);
                return [2 /*return*/, res.status(200).json(poll)];
            case 3:
                err_4 = _a.sent();
                console.error(err_4);
                return [2 /*return*/, next({
                        status: 400,
                        message: err_4.message,
                    })];
            case 4: return [2 /*return*/];
        }
    });
}); };
var vote = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pollId, vote, poll, votedOption, err_5;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pollId = req.params.id.toString();
                vote = req.body.vote;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 8, , 9]);
                if (!vote) return [3 /*break*/, 6];
                return [4 /*yield*/, poll_1.default.findById(pollId)];
            case 2:
                poll = _a.sent();
                if (!poll)
                    throw new Error("No such poll found");
                votedOption = poll.options.map(function (data) {
                    return data.option === vote
                        ? {
                            option: data.option,
                            votes: data.votes + 1,
                        }
                        : data;
                });
                if (!(poll.voted.filter(function (user) { return user.toString() === req.user.id; }).length <= 0)) return [3 /*break*/, 4];
                poll.voted.push(req.user.id);
                poll.options = votedOption;
                return [4 /*yield*/, poll.save()];
            case 3:
                _a.sent();
                return [2 /*return*/, res.status(202).json(poll)];
            case 4: throw new Error("Already voted");
            case 5: return [3 /*break*/, 7];
            case 6: throw new Error("No vote provided");
            case 7: return [3 /*break*/, 9];
            case 8:
                err_5 = _a.sent();
                return [2 /*return*/, next({
                        status: 400,
                        message: err_5.message,
                    })];
            case 9: return [2 /*return*/];
        }
    });
}); };
var deletePoll = function (req, res, next) { return __awaiter(void 0, void 0, void 0, function () {
    var pollId, user, poll, err_6;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                pollId = req.params.id.toString();
                user = req.user;
                _a.label = 1;
            case 1:
                _a.trys.push([1, 5, , 6]);
                if (user.polls) {
                    user.polls = user.polls.filter(function (userPoll) {
                        return userPoll.id.toString() !== pollId.toString();
                    });
                }
                return [4 /*yield*/, poll_1.default.findById(pollId)];
            case 2:
                poll = _a.sent();
                if (!poll)
                    throw new Error("No such poll found");
                if (poll.user.toString() !== user.id) {
                    throw new Error("Unauthorized access");
                }
                return [4 /*yield*/, user.save()];
            case 3:
                _a.sent();
                return [4 /*yield*/, poll.remove()];
            case 4:
                _a.sent();
                return [2 /*return*/, res.status(202).json({ poll: poll, deleted: true })];
            case 5:
                err_6 = _a.sent();
                return [2 /*return*/, next({
                        status: 400,
                        messasge: err_6.message,
                    })];
            case 6: return [2 /*return*/];
        }
    });
}); };
exports.default = { getPolls: getPolls, createPoll: createPoll, usersPolls: usersPolls, getPoll: getPoll, vote: vote, deletePoll: deletePoll };
