//before storing data directly into database first pass them thorugh schema,
//if they follow the schema, then only they will go to database

import express from "express";
import mongoose from "mongoose";
import Customer from "./buildSchema.js";
import Users from "./data.js";

const app = express();

await mongoose.connect(
"mongodb+srv://sparshuser1234_db_user:qofDAN694hlUxkZP@cluster0.rjfedip.mongodb.net/Thunder"); // after / add the database which you want to work on

app.use(express.json());


console.log("✅ MongoDB Connected Successfully");


//create customer 
app.post("/customer", async (req,res)=>{

   const customer = await Customer.create(req.body);
   res.json({
    message:"User is created Successfully",
    customeroperations:customer

   })

})


//create/insert data of bulk customers 
app.post("/customer/bulk", async (req,res)=>{
    const customer = await Customer.insertMany(Users);

    res.json({
        message:"User created successfully",
        customer: customer,
    })



})



//get the data of all the users in the database
app.get("/customer", async (req,res)=>{

    const customer = await Customer.find();

    res.json({
    message:"All user information is here",
    customer: customer

   })
    

})



//get all the users who are from a particular city(query parameters)
app.get("/customer/filter", async (req,res)=>{
/*  const {city,accountType} = req.query;
    const customer = await Customer.find(
        {city:city,accountType:accountType} 
        
        instead of doing this, just simply pass req.query*/

        const customer = await Customer.find(req.query);
   

    res.json({
        message:"Customer info",
        customer: customer
    })
})






//fetch the customer, information on the basis of account number

app.get(("/customer/:accountNumber"), async (req,res)=>{

    const accountvalue = req.params.accountNumber;
    const customer = await Customer.findOne({accountNumber:accountvalue});
    if(!customer){
        res.json({
            message:"Customer doesnt exist"
        })
    }
    else{
    res.send({
        message:"Customer info",
        customer: customer
    })
    }



})

app.delete(("/customer/:accountNumber"), async (req,res)=>{

    const accountvalue = req.params.accountNumber;
    const customer = await Customer.findOneAndDelete({accountNumber:accountvalue});
    if(!customer){
        res.json({
            message:"Customer doesnt exist"
        })
    }
    else{
    res.send({
        message:"Customer info",
        customer: customer
    })
    }



})





//now updating the city of the user

app.patch("/customer/:accountNumber", async (req,res)=>{
    const {city}= req.body;
   const user =  await Customer.findOneAndUpdate(
    {
        //first search the required document
        accountNumber: req.params.accountNumber
    },
    {
        //then update according to the parameter you sent in the body (here city)
        city:city,
        age:10

    },
    {
        //if you want to get the updated value,
        new:true,
        runValidators:true
    }

)

res.json({
    message:"Designated user updated successfully",
    customer:user

})

})









//now updation of accountbalance

app.patch("/customer/deposit/:accountNumber", async (req,res)=>{
    const {balance} = req.body;
   const user =  await Customer.findOne(
    {accountNumber : req.params.accountNumber}


)

user.balance+=balance; //changes are done locally
await user.save(); //save the changes in the database
res.json({
    message:"User updated successfully",
    customer:user

})
})










app.listen((3000),()=>{
    console.log("Server start at port 3000.....")
})


//************************************************************** 

/* //creating a customer
app.post("/customer", async (req,res)=>{
    const customer = await Customer.create(req.body);
    res.json({
        message:"User is created successfully",
        customer: customer;
    })
})




//inserting the data in bulk
app.post("/customer/bulk", async (req,res)=>{
    const insertion = await Customer.insertMany(Users);

})




//getting the details of all the customers
app.get("/customer", async (req,res)=>{
    const details = await Customer.find();
    res.json({
        message:"Information of all the users",
        customer:details;
    })
    
})
 */


/* app.get("/customer/:accountNumber", async (req,res)=>{

    const Accountentered = req.params.accountNumber;

     const customer = await Customer.findOne({
        accountNumber:Accountentered
    });
    res.json({
        message:"Customer information",
        customer: customer 


    });



}) */






