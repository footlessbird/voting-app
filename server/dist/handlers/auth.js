"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var currentUser = function (req, res, next) {
    res.send(req.user);
};
var logout = function (req, res) {
    req.logout();
    res.redirect("/");
};
exports.default = { currentUser: currentUser, logout: logout };
