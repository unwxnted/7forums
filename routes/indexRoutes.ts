import { Router } from "express";
import IndexController from "../controllers/index.ts";
import { isLoggedIn } from "../lib/helpers.ts";

const IndexRouter = Router();

IndexRouter.get("/", IndexController.index);
IndexRouter.get("/signup", IndexController.signup);
IndexRouter.get("/signin", IndexController.signin);
IndexRouter.get("/filter/:category", isLoggedIn, IndexController.filter);

export default IndexRouter;