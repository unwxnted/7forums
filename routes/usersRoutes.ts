import { Router } from "express";
import UsersController from "../controllers/users.ts";
import passport from "passport";


const UsersRouter = Router();

UsersRouter.post("/signup", UsersController.signUp);

UsersRouter.post("/signin", UsersController.signIn);

UsersRouter.post("/logout", UsersController.logOut);

export default UsersRouter;