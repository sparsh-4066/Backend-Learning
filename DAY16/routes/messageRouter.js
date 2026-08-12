import express from "express"
import authUserMiddleware from "../middlewares/authUserMiddleware.js";
import {getMessage,sendMessage } from "../controllers/messageController.js";
const messageRouter = express.Router();
messageRouter.use(authUserMiddleware) // protect all the below given routes 


//get message and send message corresponding to a chat


messageRouter.get("/:chat",getMessage)
messageRouter.post("/:chat",sendMessage)







export default messageRouter;