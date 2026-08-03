import http from "http";

const database =[ { name:"Rimjhim", age:21, email:"rimjhim@gmail.com", amount:69

},{
    name:"Mohak", age:12, email:"mohak@gmail.com", amount:6969
},{
     name:"Priyanshu", age:23, email:"priyanshu@gmail.com", amount:69690
}]

const server = http.createServer((request,response)=>{

    if(request.method==="POST" && request.url ===`/user`){


    let body="";
    request.on("data",(chunk)=>{
        body+=chunk;
    })


    request.on("end",()=>{
        const object = JSON.parse(body);
        console.log(object);

        database.push(object);
        console.log(database);
        response.end("User created Successfully");

})




}});

    
   /*  if(request.method ==="GET" && request.url ==="/user"){
        response.end("Hello sparsh");
    }
else if(request.method ==="POST" && request.url ==="/user"){
        response.end("POST METHOD EXECUTED, USER CREATED SUCCESSFULLY");
    }
    else if(request.method ==="PATCH" && request.url ==="/user"){
        response.end("PATCHED");
    }
   else  if(request.method ==="PUT" && request.url ==="/user"){
        response.end("PUT");
    }
    else{
        response.end("Invalid Path")
    } */



server.listen((3000),()=>{

    console.log("Server is listening at port 3000");


}
)