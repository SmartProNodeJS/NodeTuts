const path = require("path");

var express = require('express');
var userRoute = require('./routes/users.js');
var userRouteLeague = require('./routes/leagues.js');
var app = express();
var bodyParser = require("body-parser");
var cookies = require("cookie-parser");
var esession = require("express-session");
var mongo = require('mongodb');
var db = require('monk')('localhost:27017/lm');
var user_list = [];
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("public/"));
app.use(cookies());
app.use(esession({secret:"abcdefgh"}));
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
app.get('/reg', function (req, res) {
    var last_name= req.query.l_name, first_name=req.query.f_name;
    if(first_name==undefined)
      first_name = req.params.f_n+"("+req.params.age+")";
    if(last_name==undefined)
      last_name = req.params.l_n;
    var sport_list = [];
        sport_list.push({"name":"Football","desc":"Bong da"});
        sport_list.push({"name":"volleyball","desc":"Bong chuyen"});
        sport_list.push({"name":"table_tennis","desc":"Bong ban"});
        sport_list.push({"name":"swimming","desc":"Boi/Loi"});
        sport_list.push({"name":last_name,"desc":first_name});
    res.render('register',{"page_title":"Register User","sport_list":sport_list});
}); 
app.get('/regLeague', function (req, res) {
    var name= req.query.name, start=req.query.start, end = req.query.start, place = req.query.place, is_double = req.query.is_double;
    //if(name==undefined)
    //  name = req.params.f_n+"("+req.params.age+")";
    //if(last_name==undefined)
    //  last_name = req.params.l_n;
    var sport_list = [];
        sport_list.push({"name":"Football","desc":"Bong da"});
        sport_list.push({"name":"volleyball","desc":"Bong chuyen"});
        sport_list.push({"name":"table_tennis","desc":"Bong ban"});
        sport_list.push({"name":"swimming","desc":"Boi/Loi"});
        //sport_list.push({"name":last_name,"desc":first_name});
    res.render('registerLeague',{"page_title":"Register League","sport_list":sport_list});
}); 

app.get('/:id', function (req, res) {
    var id = req.query.id;
    var last_name= req.query.l_name, first_name=req.query.f_name;
    if(first_name==undefined)
      first_name = req.params.f_n+"("+req.params.age+")";
    if(last_name==undefined)
      last_name = req.params.l_n;
    var sport_list = [];
        sport_list.push({"name":"Football","desc":"Bong da"});
        sport_list.push({"name":"volleyball","desc":"Bong chuyen"});
        sport_list.push({"name":"table_tennis","desc":"Bong ban"});
        sport_list.push({"name":"swimming","desc":"Boi/Loi"});
        sport_list.push({"name":last_name,"desc":first_name});
    res.render('editLeague',{"page_title":"Edit Leagues","sport_list":sport_list});
}); 

app.post('/registerUser',urlencodedParser, function (req, res) {
    var user = {};
    user.first_name = req.body.first_name;
     user.last_name = req.body.last_name;
     user.age = req.body.age;
    user.sport_name = req.body.sport_name;
    user_list.push(user);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.render('list_user',{"page_title":"Danh Sach nguoi dung","users":user_list}); 
});
app.use("/users",userRoute);
app.use("/leagues",userRouteLeague);

var server = app.listen(8081, function () {
var host = server.address().address,
    port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
});