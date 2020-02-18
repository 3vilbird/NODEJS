const express= require("express");
const bodyparser=require("body-parser");

const app = express();
// when ever we use `app.use` its a middle ware;
app.use(bodyparser.urlencoded({ extended: false }));

app.use("/login",express.static(__dirname+"/public"));

app.get("/",(req,res)=>{
    res.send("hello hi");
})


app.post("/login",(req,res)=>{
    console.log(req.body.email);
    // some processsing of the coode....lol

    // rediect to next page after the authentication;
    res.redirect("/");

});

app.listen(3000,()=>console.log("server is up running at port number 3000...."));