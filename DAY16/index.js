import express from "exprees"
import connectDB from "./config/database.js";
import dotenv from "dotenv";
import userRouter from "./routes/userRouter.js";
import messageRouter from "./routes/messageRouter.js";
import chatRouter from "./routes/chatRouter.js";
import chatRouter from "./routes/chatRouter.js";
import cookieParser from "cookie-parser";



dotenv.config();  // it will put the env contents inside process.env(initially an empty object) 




const app = express();
app.use(express.json());
app.use(cookieParser());




app.use("/user",userRouter);
app.use("/msg",messageRouter);
app.use("/chat",chatRouter);






const startserver = async()=>{
    try{
        await connectDB();  // if error comes on calling connectDB function, then throw that error and call the catch part
        
        app.listen(process.env.PORT, ()=>{
            console.log("Server has stated listening at port 3000....")

        })
    }
    catch(err){
        console.log(err);
    }
}



startserver();
