"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var auth_1 = __importDefault(require("./auth"));
var poll_1 = __importDefault(require("./poll"));
exports.default = { auth: auth_1.default, poll: poll_1.default };
