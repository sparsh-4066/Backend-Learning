import express from "express"
import authUserMiddleware from "../middlewares/authUserMiddleware.js";
import {getMessage,sendMessage } from "../controllers/messageController.js";
const messageRouter = express.Router();
messageRouter.use(authUserMiddleware) // protect all the below given routes 


//get message and send message corresponding to a chat


messageRouter.post("/", sendMessage)  // this one is for the first message of any chat(thats why no chatId is sent in the url) 
messageRouter.get("/:chat",getMessage)
messageRouter.post("/:chat",sendMessage)







export default messageRouter;