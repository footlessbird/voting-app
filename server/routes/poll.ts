import { Router } from "express";
import handle from "../handlers";
import { requireLogin } from "../middleware/requireLogin";

const router = Router();
const { getPolls, createPoll, usersPolls, getPoll, vote, deletePoll } = handle;

router.route("/").get(getPolls).post(requireLogin, createPoll);

router.get("/user", requireLogin, usersPolls);

router
  .route("/:id")
  .get(getPoll)
  .post(requireLogin, vote)
  .delete(requireLogin, deletePoll);

export default router;
