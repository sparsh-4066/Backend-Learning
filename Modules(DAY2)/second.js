console.log("Payment is being processed");

function payment(num1){
    console.log(`${num1} is completed`);
}

function hello(){
    console.log("Hello Ji kaise ho")
    
}
function add(){
    console.log("This is going to be added now");
}

/* module.exports = {
    payment:payment,
    hello:hello
} */


//either send the way above is defined or by this way as both the key value is same
//you can send in object form or even in array form.


module.exports = { hello,add };