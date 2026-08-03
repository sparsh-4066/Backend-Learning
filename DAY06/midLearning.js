import express from "express";

const app= express();



    // prefix match hona chaiye to be mandatory
   /*  app.use("/products",(req,res)=>{  // in this case, /products,/products/xncidci any string it can accept which contains/product as a substring
        res.send("Hello 1st")
    }) */

    //app.use only matches prefix, not like other app.get/patch/put where the exact path should match.

    /* app.use((req,res)=>{
        res.send("Hello 2nd");

    })
 */


   /*  app.use("/practice",(req,res)=>{
        res.send("Hello User");
    }) */

        


        //the below 2 routes do not require authentication ,they are independent

        app.get("/",(req,res)=>{
            res.send("This is home page")

        })

        app.get("/article",(req,res)=>{
            res.send("Welcome to article page")

        })




   


        //before the following statements get executed, let us verify,

        const isVerified = true;
       // this is known as middlewares.(verification)
        app.use("/practice",(req,res,next)=>{
            if(!isVerified){
                 res.send("Kindly Login");
                 return;
            }
            next(); //using next() will execute the below functions.
        })

        //if the users are verified, then the below 2 lines get executed.
        app.get("/practice",(req,res)=>{
            res.send("This is your practice problem page");
        })
        app.get("/practice/:id",(req,res)=>{
            res.send(`This is your required problem ${req.params.id}`)
        })





app.listen((3000),()=>{
    console.log("Server is listening at port 3000...")
})
