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
email:{
    type:String,
    required:true,
    unique:true
},
password:{
    type:String

}




}, {timestamps:true});

// now model of the schema

const User = mongoose.model("User", userSchema)  //create a model named User that follows the rule defined in userSchema
//a collection customers would be made.
export default User;







// email: unique:true, required:true, email dena compulsory hai, wo inique hoga aur uske around indexes create honge,
//phone number: sparse:true, unique:true----> number dena compulsory nahi hai, lekin agar doge, to unique hoga aur uske around index bana dega