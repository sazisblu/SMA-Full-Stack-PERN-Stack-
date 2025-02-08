import { Router } from "express";
import {
  fetchpost,
  createpost,
  updatepost,
  deletepost,
} from "../services/posts.service.js";

const router = Router();

//get post to display on dashboard
router.get("/", async (req, res) => {
  console.log("i am at the get posts route");
  try {
    console.log("entered posts being fetched for dashboard");
    // console.log("request being sent for fetching post:", req);
    const { searchTerm, cursor, limit } = req.query;
    console.log("searchTerm", searchTerm);
    const result = await fetchpost({
      searchTerm: searchTerm,
      cursor: cursor,
      limit: limit,
    });
    console.log("result:", result);
    res.json(result);
  } catch (error) {
    console.log("Error at post retreival::", error);
    res.status(400).send({
      message: "error occured at fetching posts",
      error: error,
    });
  }
});

//create a post
router.post("/", async (req, res) => {
  try {
    console.log("server at Createpost route");
    const result = await createpost(req);
    res.send(result);
  } catch (error) {
    console.log("Error at post creation: ", error);
    res.status(400).send({
      message: "Error Occured",
      error: error,
    });
  }
});

//update a post
router.patch("/postid", async (req, res) => {
  try {
    const result = await updatepost(req);
    res.send(result);
  } catch (error) {
    console.log("error at post updating : ", error);
    res.status(400).send({
      message: "Error Occured",
      error: error,
    });
  }
});

//delete a post
router.delete("/postid", async (req, res) => {
  try {
    const result = await deletepost(req);
    res.send(result);
  } catch (error) {
    console.log("error at post deletion: ", error);
    res.status(400).send({
      message: "Error Occured",
      error: error,
    });
  }
});

export default router;
