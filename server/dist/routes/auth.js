"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var passport_1 = __importDefault(require("passport"));
var handlers_1 = __importDefault(require("../handlers"));
var router = express_1.Router();
router.get("/google", passport_1.default.authenticate("google", {
    scope: ["profile", "email"],
}));
router.get("/google/callback", passport_1.default.authenticate("google"), function (req, res) {
    res.redirect("/");
});
router.get("/current_user", handlers_1.default.currentUser);
router.get("/logout", handlers_1.default.logout);
exports.default = router;
