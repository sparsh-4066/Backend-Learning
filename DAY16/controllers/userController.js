// login. signup, logout, profile function

import User from "../model/userSchema.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { signupSchema, loginSchema } from "../validators/userValidator.js";




const createToken = (id,email)=>{
    if(!process.env.JWT_SECRET){
        throw new Error("JWT Secret key is missing"); // return back to where it is called
        
    }
    const token = jwt.sign({id,email},process.env.JWT_SECRET,{expiresIn:"1h"})
    return token;

}

const cookiesOption = {
    httpOnly:true,
    secure:false,
    maxAge: 60*60*1000
}




export const signup = async (req,res)=>{
    try{

        //validate all these datas

        const result =signupSchema.safeparse(req.body);
        //safeparse--> if any error comes, it will not throw errors,
        //it will return an object and will store in result
        //and check the status of result
        

        //if failes
        if(!result.success){
            return  res.status(400).json({
                message: result.error.issues[0].message  //this is a format
            }) 
        }

         

        // if passed
        const {name,age,email,password} = result.data; // now replace  (RHS)of 
        //this line i.e req.body---> result.data


        

        //now few lines below can be commented out....(no requriement since we have already validated)
        /* if(!email || !password || !name){

            //return so that the next lines of code do not execute
            return res.status(400).json({
                message:"Some fields are missing ,kindly fill them"
            })
        
        } */
       



        //now check whether the email already exists or not.

        const user = await User.findOne(
            {
                email
            }
        )

        if(user){
            return res.status(409).json({
                message:"Email ID already exists"
            })
        }


        const hashPassword = await bcrypt.hash(password,12);

        const userCreated = await User.create({
            name,
            age,
            email,
            password:hashPassword
         })
         

         //now create token,
         const token = createToken(userCreated._id,userCreated.email);

         res.cookie("token",token,cookiesOption);

         res.status(201).json({
            message:"User created successfully",
            name:name,
            age:age,
            email:email

         })



    }


    catch(err){
        console.log(err); // for me, printing the exact error at backend
        res.status(500).json({  // just give the genuine error at the frontend
            message:"Internal Server Error"
        })
    }




    }









export const login = async (req,res)=>{
    try{


        const result = loginSchema.safeparse(req.body);

         //if failed to satisfy schema
         if(!result.success){
            return  res.status(400).json({
                message: result.error.issues[0].message  //this is a format
            }) 
        }
        
        
            //if passed
        const {email,password} = result.data; //replace req.body with result.data


        /* if(!email || !password){
            return res.status(400).json({
                message:"Email,password or some field ae missing"
            })

        } */

        //verify the password

        const existingUser = await User.findOne({email});

        if(!existingUser){
            return res.status(401).json({
                message:"Not found user"
            })
        }

        const isMatch = await bcrypt.compare(password, existingUser.password)

         if(!isMatch){
            return res.status(401).json({
                message:"Invalid credentials"
            })
        }

        const token = createToken(existingUser._id,email);

        res.cookie("token",token,cookiesOption);

        res.status(200).json({
            message:"User logged in successfully",
            name:existingUser.name,
            age:existingUser.age,
            email:existingUser.email,
            usage:existingUser.usage
        })






    }
    catch(err){

        console.log(err);
        res.status(500).json({
            message:"Internal server error"
        })

    }



}





//for logout, user clicks on logout, response from server should be like--> remove the token which you have stored.
export const logout = async (req,res)=>{

    res.clearCookie("token",{
        httpOnly:true,
        secure:false,

    })
    res.status(200),json({
        message:"User logged out successfully"

    })
}







//only show those profiles, which has a authenticated token, and can access his own profile
/* export const profile = async (req,res)=>{

    try{

        const {email} = req.body;

        if(!email){
           return res.status(400).json({
                message:"Email is missing"
            })
        }

       const existingUser =  User.findOne({email});

       if(!existingUser){

        return res.status(404).json({
            message:"Invlaid email"
        })
       }

       res.status(200).json({
        name:existingUser.name,
        age:existingUser.age,
        usage:existingUser.usage,
        email:existingUser.email
       })
        

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            message:"Internal server error"
        })

    }


    
} */


export const profile = async (req,res)=>{
    try{

        //user is authenticated, now send the profile info
        //Database ke andar call kro, aur us user kop search kro , jo ki hm pehle kar chuke hai
        //userUserMiddleware ke andar

        res.status(200).json({
            name:req.user.name,
            age:req.user.age,
            usage:req.user.usage,
            email:req.user.email

        })

    }
    catch(err){
        console.log(err);
        res.json(500).json({
            message:"Internal server error"
        })

    }
}