import { Router } from "express";
import handle from "../handlers";
import { requireLogin } from "../middleware/requireLogin";

const router = Router();
const { getPolls, createPoll } = handle;

router.get("/", getPolls).post("/", requireLogin, createPoll);

export default router;
