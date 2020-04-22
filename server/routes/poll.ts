import { Router } from "express";
import handle from "../handlers";
import { requireLogin } from "../middleware/requireLogin";

const router = Router();
const { getPolls, createPoll, usersPolls } = handle;

router.get("/", getPolls).post("/", requireLogin, createPoll);

router.get("/user", requireLogin, usersPolls);

// router.route("/:id").get().post().delete();

export default router;
