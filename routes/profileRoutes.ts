import { Router } from "express";
import ProfileController from "../controllers/profile.ts";
import { isLoggedIn } from '../lib/helpers.ts'

const ProfileRouter = Router();

ProfileRouter.get("/:id", isLoggedIn, ProfileController.index);

export default ProfileRouter;