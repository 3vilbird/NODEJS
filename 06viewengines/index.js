const express= require("express");
const path= require("path");


let app =express();

// initial set up for view engine
app.set('views',path.join(__dirname,'views')); // set views dir
app.set('view engine','pug')

var port=process.env.PORT || 3000;
app.get("/",(req,res)=>{
    res.render("index");
}).listen(port,()=>console.log("server is running on port"+port));