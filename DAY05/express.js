import express from "express"

const app = express();
//app is ana object and get is a method , expecting
//2 parameters, one is request.url , if it matches(in postman) then the callback function is invoked written beside that url


const database= [];

app.use(express.json()) // accepts all methods GET, PUT,PATCH,POST, DELETE
//Body data is parsed first, converted into JS object and then the below methods are invoked
// this is middleware



//these are routes
app.get("/",(req,res)=>{
    res.send("Welcome to Home Page");
})


app.get("/user",(req,res)=>{
    res.send("METHOD GET INVOKED")

})
app.post("/user",(req,res)=>{
    res.send("User added successfully");
    console.log(req.body);

})
app.delete("/user",(req,res)=>{
    res.send("METHOD DELETE INVOKED")

})





app.listen(3000,()=>{
    console.log("Server 3000 is listening....")
})
