import brcypt from "bcrypt"


const plainPassword = "Rohit@456";

//const hashPassword = await brcypt.hash(plainPassword,12);  //12 indicates the number of rounds taken from hashing of the original password, making the procees
//deliberately slow, so that it can be of no use to the hacker
//console.log(hashPassword);


//for the same password, Rohit@456, everytime a new hashPassword is generated,
// $2b$10$Fzh.C3HQfdLMjRZD.RO1Xe/33YKgb.dMlrkrODl3drz/P6A54j0bm
// $2b$10$Wp2kbyD3SzdMYStGVJsiwe5kyNbfXge7aPteGODLmXcLvdNzroxX.
// $2b$10$1OfxQwEQi1gH9UVrLQmU.eFcWRDlZpM5wZ38Y30/GaigoO5dIc4B2
// $2b  $12  $5ysXu/k131mo7rqilEpktedJnJzCgXLlwIkQCVhaSSD .  3b1869jVa

// $2b--> the algorithm/version of bcrypt library we are using
// $10--> the number of rounds we are using
//   $5ysXu/k131mo7rqilEpktedJnJzCgXLlwIkQCVhaSSD --> the salt value
//   3b1869jVa  ---> the actaul hashed password


//now for verifying the password, just take the plain password and the last generated hashpassword

const verify  = await brcypt.compare(plainPassword,"$2b$12$5ysXu/k131mo7rqilEpktedJnJzCgXLlwIkQCVhaSSD.3b1869jVa");
console.log(verify);

// server will take plainpassword(from user input) + salt present in hashed password(from the database) + version + number of rounds ---> creates the hash,
//if the created hash ==  $2b$12$5ysXu/k131mo7rqilEpktedJnJzCgXLlwIkQCVhaSSD.3b1869jVa (the one stored in the database)