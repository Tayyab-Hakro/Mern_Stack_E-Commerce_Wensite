import express from 'express';
import { loginUser, registerUser,admingLogin } from '../controllers/userController.js';

const userRouter = express.Router()

userRouter.post("/register", registerUser)
userRouter.post("/login" ,loginUser)
userRouter.post("/admin" ,admingLogin)

export default userRouter
