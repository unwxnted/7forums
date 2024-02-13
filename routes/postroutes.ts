import { Router } from "express";
import PostController from "../controllers/post.ts";
import { isLoggedIn } from '../lib/helpers.ts'

const PostRouter = Router();

PostRouter.get("/create", isLoggedIn, PostController.index);
PostRouter.post("/create", isLoggedIn, PostController.create);
PostRouter.get("/view", isLoggedIn, PostController.view);
PostRouter.post("/comment", isLoggedIn, PostController.comment);

export default PostRouter;