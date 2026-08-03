import express from "express"

import {products} from "./data.js"

const app = express() //creating servers
app.use(express.json())  // middlewares

app.get("/",(req,res)=>{
    res.send("This is the home page");
})

app.get("/products",(req,res)=>{
    res.json(products); // or you can use res.send(products)
}) 

app.get("/products/:id",(req,res)=>{
   /*  const index = req.params.id;
    res.send(products[index-1]); */
    const id = Number(req.params.id);
    const find = products.findIndex((p1)=> p1.id===id)
    if(find>=0){
        res.send(products[find])
    }
    else{
        res.send("Product does not exist");
    }

})



//get parameters
/* app.get("/products/:id",(req,res)=>{  // :id is dynamic, can be 1,2,3,////
    const index = req.params.id; // usig route parameters (id)
    res.send(products[index-1]);   
}) */


//query parameters   http://localhost:3000/products?price=70000


/* app.get("/products",(req,res)=>{
 const price = req.query.price;
 const filterdata = products.filter((p) => p.price>=price);
 console.log(filterdata);
 res.json(filterdata);
}) 
 
   the above one is for applying one filter
       */


   /*  app.get("/products",(req,res)=>{
    let {price,rating,category,brand,inStock} = req.query;
    let filterdata = products;
    if(price){
         filterdata = filterdata.filter((p) => p.price>=price)
    }
    
    if(rating){
         filterdata = filterdata.filter((p) => p.rating>=rating)
    }
   
    if(price){
        const filterdata = filterdata.filter((p) => p.price>=price)
    }
    
    if(price){
        const filterdata = filterdata.filter((p) => p.price>=price)
    }
    
    if(price){
        const filterdata = filterdata.filter((p) => p.price>=price)
    }
    
    if(price){
        const filterdata =filterdata.filter((p) => p.price>=price)
    }
      res.json(filterdata);
      console.log(filterdata);

   })     */

      app.post("/products",(req,res)=>{

        products.push(req.body);
        res.json(req.body);
        console.log(req.body)

      })

      
      //modifying the delete function 
      app.delete("/products/:id",(req,res)=>{

        const index = req.params.id;

        const p = products.findIndex((p1)=>p1.id==index);
        if(p>=0){
            const deleted = products.splice(p,1);
            res.json(deleted);
            console.log(products);
        }
        else{
            res.send("Product is not Found");
        }

      })

        /* app.delete("/products",(req,res)=>{
            const conti = req.body;
            res.send(conti);
        }) */




            app.patch("/products",(req,res)=>{
                const data =  req.body;
               const fetchProduct= products.find((p1)=> p1.id==data.id);
               if(fetchProduct){
               Object.assign(fetchProduct,data)
               res.send("Product is updated successfully")
               } 
               else{
                res.send("Product is not found");
               }

            })






app.listen((3000),()=>{
    console.log("Server is listening at port 3000")
})
