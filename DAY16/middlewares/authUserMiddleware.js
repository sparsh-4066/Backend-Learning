import jwt from "jsonwebtoken";
import User from "../model/userSchema.js"







const authUserMiddleware = async (req,res,next)=>{
    try{
        const {token}  = req.cookies;

        const payload = jwt.verify(token, process.env.JWT_SECRET);

        const existingUser = await User.findById(payload.id) 
        //in the above statement, a call is already made to the database,so
        // so when in next(the profile) section is called, it should not search the database again and again


 
        if(!existingUser){
            return res.status(404).json({
                message:"User does not exist"
            })
        }

        req.user = existingUser;  // in profile,or in get chats , I should not have to make the call again to the database

        next();


    }
    catch(err){
        console.log(err);
        res.status(500).json({message:"Internal server error"})

    }
}


export default authUserMiddleware;