const http = require(`http`);
const url = require(`url`);

const database =[{name:"Sparsh",age:10, education:"Btech"},
    {name:"Mohit", age:11, education:"Btech"}]


      function addUser(query){
        database.push(query);
    }

    function deleteUser(delet){
        for(let i=0;i<database.length;i++){
            if(database[i].name===delet.name){
                database.splice(i,1);
                break;
            }

        }
    }




const server = http.createServer((request,response)=>{
   const parsed = url.parse(request.url,true);
   const operation = parsed.pathname.slice(1);
  
   if(operation===`getUser`){
     response.end(JSON.stringify(database));
     return;
   }

   else if(operation  === `addUser`){
    const query = parsed.query;
    addUser(query);
    response.end("User added Successfully");
     
    return;
}
else if(operation === `deleteUser`){
    const delet = parsed.query;
    deleteUser(delet);
    response.end("User deleted successfully");
    return;

}

else if(operation === `updateUser`){
    const update = parsed.query;
    updateUser(update);
    response.end
}
else{
    response.statusCode=404;
    response.end("Operarion not found")
}





    
})

server.listen((3000),()=>{
    console.log(`Server is listening at port 3000`);
})
