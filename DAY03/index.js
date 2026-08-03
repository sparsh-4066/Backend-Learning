/* const http = require(`http`);

const server =  http.createServer((req,res)=>{
    res.end("Hi baby");
})

server.listen(9000,()=>{
    console.log("Server is listening at port 9000")
}) */

const validator = require(`validator`)
const email = `rohit@gmail.xcom`
const passsword = "Rohit@456";
const comment = "cdsijcidsc"

console.log(validator.isEmail(email))