import {z} from Zod;

//validatimg name,age,email,password;

export const signupSchema = z.Object({

    name:z.string()
    .trim()
    .min(3,"Minimum Length of name should be 3")
    .max(30,"maximum length of name should be 30"),


    age:z.number()
    .min(10,"Minimum age should be 10")
    .max(100,"Maximum age should be 100")
    .optional(),   //that this field is optional
     
    email:z.preprocess(
            (value)=> typeof value =="string" ? value.trim().toLowerCase() :"",
            z.email("Email must be valid")
          ),


    password:
            z.string()
            .min(8)
            .max(30)
            .regex(/[A-Z]/, "Your password should have atleast 1 capital letter")
            .regex(/[a-z]/, "Your password should have atleast 1 small letter")
            .regex(/[0-9]/, "Your password should have atleast 1 number")
            .regex(/[~?<>{}:(){};'.;,]/, "Your password should have atleast 1 special character"),


});


export const loginSchema = z.Object({

    email:z.preprocess(
            (value)=> typeof value =="string" ? value.trim().toLowerCase() :"",
            z.email("Email must be valid")
          ),


    password:
            z.string()
            .min(8)
            .max(30)
            .regex(/[A-Z]/, "Your password should have atleast 1 capital letter")
            .regex(/[a-z]/, "Your password should have atleast 1 small letter")
            .regex(/[0-9]/, "Your password should have atleast 1 number")
            .regex(/[~?<>{}:(){};'.;,]/, "Your password should have atleast 1 special character"),



})

 