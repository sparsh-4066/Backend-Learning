import express from "exprees"
import connectDB from "./config/database.js";
import dotenv from "dotenv"




dotenv.config();  // it will put the evn contents inside process.env(initially an empty object) 




const app = express();
app.use(express.json());





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
