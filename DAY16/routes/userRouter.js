import express from "express"
import {login,signup, profile, logout,deleteAccount} from "../controllers/userController"
import authUserMiddleware from "../middlewares/authUserMiddleware.js";
const userRouter = express.Router();



userRouter.post("/signup",signup)
userRouter.post("/login",login)
userRouter.post("/logout",logout)

userRouter.get("/profile",authUserMiddleware,profile)
userRouter.delete("/delete",authUserMiddleware,deleteAccount);

export default userRouter;