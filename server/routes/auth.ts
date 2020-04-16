import { Router } from "express";
import passport from "passport";
import handle from "../handlers";

const router = Router();

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get("/google/callback", passport.authenticate("google"), (req, res) => {
  res.redirect("/");
});

router.get("/current_user", handle.currentUser);
router.get("/logout", handle.logout);

export default router;
