const router = require("express").Router();
const handle = require("../handlers");

router.get("/", handle.getPolls);

module.exports = router;
