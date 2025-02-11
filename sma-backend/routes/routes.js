import { Router } from "express";
import authroute from "./auth.route.js";
import postroute from "./post.route.js";
import authentication from "../middlewares/authentication.js";
const router = Router();

router.get("/login", (req, res) => {
  console.log("Inside login");
});

//non authentication routes
router.use("/auth", authroute);
router.use(authentication); // ->> middleware inclusion
//Authentication routes
router.use("/posts", postroute);
export default router;
