const express = require('express');
const app = express();

// middleware
var itsmiddle= (req,res,next)=>{
    console.log("its from middle ware");
    next();
}

var serverTime =(req,res,next)=>{
    req.requestTime = Date.now();
    next();
}

app.use(itsmiddle);
app.use(serverTime);

app.get("/",(req,res)=>{
    res.send("hellow world"+"and the time is "+req.requestTime );
    console.log("its after the request");
});
app.listen(3000,()=>console.log("server is up running at port number 3000...."));