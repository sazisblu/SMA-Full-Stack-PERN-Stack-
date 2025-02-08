import { Router } from "express";
import authroute from "./auth.route.js";
import postroute from "./post.route.js";
const router = Router();

router.get("/login", (req, res) => {
  console.log("Inside login");
});

router.use("/auth", authroute);
router.use("/posts", postroute);
export default router;
