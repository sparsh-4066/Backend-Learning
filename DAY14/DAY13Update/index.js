import express from "express"
import mongoose from "mongoose";
import User from "./userSchema.js"
import jwt from "jsonwebtoken"
import cookieParser from "cookie-parser";
import bcrypt from "bcrypt";

await mongoose.connect("mongodb+srv://sparshuser1234_db_user:qofDAN694hlUxkZP@cluster0.rjfedip.mongodb.net/LearnAuth")

const app = express();
app.use(express.json());
app.use(cookieParser())



// for user signup
app.post("/signup",async (req,res)=>{

    const{name,age,email,password} = req.body;

    const hashPassword = await bcrypt.hash(password,12);

    const u  = await User.create({
        name:name,
        age:age,
        email:email,
        password:hashPassword
    })





    

    //now create the token so that the user does not have to login again and again
    // when token comes at backend, token verification(ki server ne hi create kiya tha) + which user has sent(payload verificartion)
    const token = jwt.sign(
        {  // no password, just user and email(creating the payload part)
        email:email,
        name:name
    },
        "Rohit@456",   //the key which is used to sign the token
  
    {
        expiresIn:"1h"

    }

)

//talking to browser only
res.cookie("token",token,{
    httpOnly:true,  //cookies handled by browser , not by my site.
    secure:false,  // for now send in http, secure:true
    maxAge:60*60*1000   //(in ms)
})






//now inform the user that his profile is created

res.json(
    {
        message:"User profile is created"
    }
)



})




//now user fetches the data, but first verify its token
app.get("/user",async (req,res)=>{
    
    //take the token out of the cookies
    const {token}  = req.cookies;

    //now verify the token.

    const payload = jwt.verify(token, "Rohit@456");
 
    //get the required user
    const u = await User.findOne(
        {
            email:payload.email
        }
    )
   
    if(u){
        res.json({
            message:"Your User detail",
            email:u.email,
            age:u.age,
            
        })
    }
    else{
        res.json({
            message:"NO such user found"
        })
    }

    //now get the user



})



//for user login
app.post("/login", async(req,res)=>{

    const{email,password} = req.body;

     // verify its password
      const u = await User.findOne({email:email});
      if(u){
        const isMatch = await bcrypt.compare(password, u.password);



        if(isMatch){


        const token = jwt.sign(
        {  // no password, just user and email(creating the payload part)
        email:u.email,
        name:u.name
    },
        "Rohit@456",   //the key which is used to sign the token
  
    {
        expiresIn:"1h"

    }

)

//talking to browser only
res.cookie("token",token,{
    httpOnly:true,  //cookies handled by browser , not by my site.
    secure:false,  // for now send in http, secure:true
    maxAge:60*60*10000   //(in ms)
})






//now inform the user that his profile is created

res.json(
    {
        message:"User Logged in successfully"
    }
)


      }

      else{

        res.json(
    {
        message:"User Not found"
    }
)


      }

      }
       
      
      //if user has wrong 
      else{
        res.json({
            message:"User not found"
        })

      }




})















app.listen((3000),()=>{
    console.log("Server is listening at port 3000")
}
)

