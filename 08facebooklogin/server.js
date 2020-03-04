var express = require("express");
var passport = require("passport");
var Strategy = require("passport-facebook").Strategy;

var port = process.env.PORT || 3000 ;

passport.use(new Strategy({
    clientID:"replace with your id",
    clientSecret:"replace with your secret",
    callbackURL:"http://localhost:3000/login/facebook/return"
}, function(accessToken,rereshToken,profile,cb)
    {
        return cb(null,profile);
    } 
)
);

passport.serializeUser(function(User,cb){
    cb(null,User);
});
passport.deserializeUser(function(obj,cb){
    cb(null,obj);
});

// create a express app
var app = express();
// set view dir

app.set("views",__dirname+"/views");
app.set("view engine","ejs");

// middlewares  please check the official docs
app.use(require("morgan")("combined"));
app.use(require("body-parser").urlencoded({extended:true}));
app.use(require("cookie-parser")());
app.use(require("express-session")({secret:'loool app',resave:true,saveUninitialized:true}));


// route configuration.................! docs
//=================================================//
// @route   -   GET /
// @desc    -   a route to home 
// @access  -   PUBLIC
app.get('/',(req,res)=>{
    res.render('home',{user:req.user});
});


//=================================================//
// @route   -   GET /login
// @desc    -   a route to login 
// @access  -   PUBLIC
app.get('/login',(req,res)=>{
    res.render('login');
});


//=================================================//
// @route   -   GET /login/facebook
// @desc    -   a route to faebook
// @access  -   PUBLIC
app.get('/login/facebook',passport.authenticate('facebook'));

//=================================================//
// @route   -   GET /login/facebook
// @desc    -   a route to faebook callback
// @access  -   PUBLIC
app.get('/login/facebook/callback',
  passport.authenticate('facebook',{failureRedirect:'/login'}),
        function(req,res){
            // success authentication redirect
            res.redirect('/');
 });

 //=================================================//
// @route   -   GET /profile
// @desc    -   a route to faebook callback
// @access  -   PRIVATE
app.get('/profile',require('connect-ensure-login').ensureLoggedIn(),(req,res)=>{
    res.render('profile',{user:req.use});
});
app.listen(port);

