import { Router } from "express";
import IndexController from "../controllers/index.ts";

const IndexRouter = Router();

IndexRouter.get("/", IndexController.index);
IndexRouter.get("/signup", IndexController.signup);
IndexRouter.get("/signin", IndexController.signin);

export default IndexRouter;