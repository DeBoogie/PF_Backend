import express, { Router } from "express";
import UserController from "../controllers/UserController";
import { RequireAuthentication } from "../lib/RequireAuthentication";

const userController = new UserController();
const userRouter: Router = express.Router();

userRouter.get("/", RequireAuthentication, userController.getAllUsers);
userRouter.get("/:id", RequireAuthentication, userController.getUserById);
userRouter.post("/signin", userController.signIn);

export default userRouter;