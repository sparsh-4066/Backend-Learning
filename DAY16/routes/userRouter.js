import express from "express"
import {login,signup, profile, logout} from "../controllers/userController"

const userRouter = express.Router();



userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/logout",logout)

userRouter.get("/profile",profile)

export default userRouter;