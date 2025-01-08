import express from "express";
import { userSignup } from "../Controllers/userController.js";

const userRouter = express.Router();

userRouter.post("/signup",userSignup);

export default userRouter;