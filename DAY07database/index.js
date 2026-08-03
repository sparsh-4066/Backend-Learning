import express from "express";
import fs, { write } from "fs"// Js provides fs as an object to read and write from text files



const app = express();

app.use(express.json());


/* dataWrite=[
    { name:"rohit",
        age:10
    },
    { name:"mohit",
        age:20
    },
    { name:"sohit",
        age:30
    },
    { name:"gohit",
        age:40
    },
    { name:"rohit",
        age:50
    }

] */


const DBPath = "./database.txt"

function readDB(){
    const data = fs.readFileSync(DBPath,"utf-8"); // read the data in database.txt
    // whole database data is available to me in the form of String(JSON)
    //now convert that data into object form
    return JSON.parse(data);


}

function writeDB(dataWrite){   //overwrites the database.txt file
    //dataWrite is an array of objects, first convert into JS string and then send it because database.txt stores data in text format
    fs.writeFileSync(DBPath,JSON.stringify(dataWrite,null,2)) //send the data to tjhe file in string format 

}





app.get("/",(req,res)=>{
    res.send("Welcome to home page")

})


//fetch customer detail using account number
app.get("/user/:accountNumber",(req,res)=>{
    const accountId = req.params.accountNumber 

    //get data from database
        const account = readDB(); //calling readDB function and getting all data in JS object
        const user = account.find((p1)=>p1.accountNumber==accountId)
        res.send(user);
})

//account creation

app.post("/user",(req,res)=>{
    const user = req.body;
    const getdata = readDB(); // getting all the data in the array of objects form from the databse
    getdata.push(user);   // push the new data in that array of objects
    writeDB(getdata); //rewrite the data in the file.
    // res.json(user);
    res.send("User created successfully");
    


})

app.delete("/user",(req,res)=>{
        const accountId = req.body.accountNumber;
        const gettingData = readDB();
        const deleteacc = gettingData.filter((p2)=>p2.accountNumber!=accountId);

        writeDB(deleteacc);
        res.send("User deleted successfully");
        res.json(req.body);

        
        
})

app.patch("/user",(req,res)=>{
    const balanceUpdate = req.body.balance;
    const accountId = req.body.accountNumber;

    const gettedData = readDB();
    const user = gettedData.find((p3)=>p3.accountNumber==accountId);
    user.balance+=balanceUpdate;
    writeDB(gettedData);
    res.send("Balance updated successfully");
     

})


app.listen(3000,()=>{
    console.log("Server is listening at port 3000");
})