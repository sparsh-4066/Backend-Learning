// getRecentAge: top 20, getSingleChat, createChat,deleteCHat

import express from "express"
import authUserMiddleware from "../middlewares/authUserMiddleware.js";
import { getRecentChat,getSinglechat,createChat,deleteChat } from "../controllers/chatController.js";


const chatRouter = express.Router();



chatRouter.use(authUserMiddleware); //this line will look for
//authentication of the below 4 functions,
//since it is used in all the four functions below,
//thats' why just use this --> chatRouter.use(authUserMiddleware);





//now since the authorization is used for all the 4 chats , thats' why...
chatRouter.post("/createChat", createChat);
chatRouter.get("/getRecentChat",getResentChat)
chatRouter.get(":chatId",getSingleChat)
chatRouter.get("/getRecentChat",deleteChat)




export default chatRouter;