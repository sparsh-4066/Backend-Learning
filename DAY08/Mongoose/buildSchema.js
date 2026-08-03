import mongoose from "mongoose";


//fields are name, accountNumber,city,age,balance,accountType

const userSchema = new mongoose.Schema({    // returns an object to userSchema
//tell all the fields in the schema
name:{
    type:String,
    minLength:3,
    maxLength:20,
    trim:true,
    required:true,

},
accountNumber:{
    type:Number,
    required:true,
    unique:true
},
city:{
    type:String,
    minLength:3,
    maxLength:20,
    trim:true
},
age:{
    type:Number,
    min:18,
    max:100
},
balance:{
    type:Number,
    min:0,
    required:true

},
accountType:{
    type:String,
    required:true,
    enum:["current","saving"],
    default:"saving"

}




}, {timestamps:true});

// now model of the schema

const Customer = mongoose.model("Customer", userSchema)  //create a model named Customer that follows the rule defined in userSchema
//a collection customers would be made.
export default Customer;