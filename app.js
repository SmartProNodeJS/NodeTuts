const path = require("path");
var express = require('express');
var bodyParser = require("body-parser");
var cookies = require("cookie-parser");
var esession = require("express-session");
var mongo = require('mongodb');
var monklib = require('monk');
var db_url = 'localhost:27017/lm';
var db = monklib(db_url, function(err, db){
    if(err){
        console.log("Could not connect to database: "+db_url);
        process.exit(0);
    }
});

var playerRoute = require('./routes/player.js');
var app = express();
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("public/"));
app.use(cookies());
app.use(esession({secret:"NoDEjSTutorial"}));
// Middle ware to put db object to request
app.use(function(req, res, next){
  req.db = db;
  next();
});

app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");

app.get('/', urlencodedParser, function (req, res) {
    res.cookie("router_root","/",{expires: new Date(360000+ Date.now())});
    res.render("index",{username:req.query.un});
});

app.use("/player",playerRoute);

var server = app.listen(8081, function () {
var host = server.address().address,
    port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
});