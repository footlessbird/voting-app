import { Router } from "express";
import handle from "../handlers";
import { requireLogin } from "../middleware/requireLogin";

const router = Router();

router.get("/", requireLogin, handle.getPolls);

export default router;
