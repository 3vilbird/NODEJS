const express= require("express");
const ejs= require("ejs");
const multer= require("multer");
const path= require("path");

const app=express();
const port= process.env.PORT | 3000;

// to store data on folder
// multer setting

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/myupload');
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now()+path.extname(file.originalname));
    }
  })
  var upload = multer({
       storage: storage,
       // can set limit and can use file filters
     }).single("profilepic");




// engine seup
app.set("view engine","ejs");
// folder  setup
app.use(express.static("./public"));

// routing satrts here

app.get("/",(req,res)=>{
    res.render("index");
})
// description
app.post("/upload",(req,res)=>{
    upload(req,res,(error)=>{
        if (error){
            res.render("index",{
                message: error
            })        
        } else{
            res.render("index",{
                message:"file uploaded successfuly",
                filename:`myupload/${req.file.filename}`
            });

        }
    })
})


app.listen(port,()=>console.log(`Server is running on port number ${port}...`));
