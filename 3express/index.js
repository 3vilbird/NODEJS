const express = require('express');
const app = express();

app.get("/",(req,res)=>{
    res.send("hellow world");
});
app.get("/about",(req,res)=>{
   // res.send("<h1>this is from about page</h1>");
   // send json data
   //res.send({user:'abcd',balance:"3000$",id:"123gh5"})
   res.status(200).send({user:'abcd',balance:"3000$",id:"123gh5"})
});

app.get("/contacts",(req,res)=>{
    res.send("this is from the contact page")
})
app.get("/services",(req,res)=>{
    res.send("<ul><li>coding</li><li>sleeping</li><li>repeat</li></ul>");

})
app.post("/login",(req,res)=>{
    res.send("login success");
})
app.delete("/delete",(req,res)=>{
    res.send("delete success");
})

// sending response based on parameters 
app.get("/user/:id",(req,res)=>{
    res.send(req.params);
})
app.get("/flight/:from-:to",(req,res)=>{
    res.send(req.params);
})


app.listen(3000,()=>console.log("server is up running at port number 3000...."));