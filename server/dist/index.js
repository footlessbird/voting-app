"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var express_1 = __importDefault(require("express"));
var cookie_session_1 = __importDefault(require("cookie-session"));
var mongoose_1 = __importDefault(require("mongoose"));
var passport_1 = __importDefault(require("passport"));
require("./services/passport");
var routes_1 = __importDefault(require("./routes"));
mongoose_1.default
    .connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(function () { return console.log("MongoDB connected"); })
    .catch(function (err) { return console.log(err); });
var app = express_1.default();
var PORT = process.env.PORT || 5000;
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: false }));
app.use(cookie_session_1.default({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [process.env.COOKIE_SECRET],
}));
app.use(passport_1.default.initialize());
app.use(passport_1.default.session());
app.use("/auth", routes_1.default.auth);
app.use("/polls", routes_1.default.poll);
app.use(function (req, res, next) {
    var err = new Error("Not Found 🤔");
    err.status = 404;
    next(err);
    // res.status(404).send("Page not found 🤔");
});
// err는 핸들러내 api 함수들 try/catch(err)에서 넘어온 친구
app.use(function (err, req, res, next) {
    res.status(err.status || 500).json({
        success: false,
        error: {
            message: err.message || "Something went wrong.",
        },
    });
});
app.listen(PORT, function () {
    return console.log("Example app listening at http://localhost:" + PORT);
});
