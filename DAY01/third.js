const http = require(`http`);

const server = http.createServer((request,response)=>{

const path = request.url.split('/');  // covert the string into array

const operation = path[1];
const number1= Number(path[2])
const number2= Number(path[3])




// create the rest of tesrt czses with your own
if(operation ===`add`){
    response.end(JSON.stringify(number1+number2))
}
else if(operation ===`sub`){
    response.end(JSON.stringify(number1-number2))
}
else if(operation ===`mul`){
    response.end(JSON.stringify(number1*number2))
}
else if(operation ===`div`){
    response.end(JSON.stringify(number1/number2))
}
else{
    response.end("INVALID URL");return;
}




})

server.listen(3000,()=>{
    console.log("server is listening at 3000 port");
})