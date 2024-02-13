import { Router } from "express";
import PostController from "../controllers/post.ts";

const PostRouter = Router();

PostRouter.get("/post/create", PostController.index);
PostRouter.post("/post/create", PostController.create);

export default PostRouter;