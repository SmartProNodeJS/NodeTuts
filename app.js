var express = require('express');
var path = require('path');
<<<<<<< HEAD
var app = express();
var bodyParser=require("body-parser");
var user_list = [];
var urlencodedParser=bodyParser.urlencoded({extended:false});
app.use(express.static("public/"));
app.set("views" ,path.join(__dirname,"views"));
app.set("view engine","pug");

app.get('/', function (req, res) {
=======
var user_list=[];
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("public/"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get('/', function (req, res) {

>>>>>>> 871c0bdebba29029a861f7393d3cbc7dee8540af
    res.render('enroll');
});
app.get('/enroll', function (req, res) {
    var sport_list = [];
<<<<<<< HEAD
    sport_list.push({"name":"Football", "desc":"Bóng đá"});
    sport_list.push({"name":"Swim", "desc":"Bơi"});
    sport_list.push({"name":"Tennis", "desc":"Quần vợt"});
    res.render("enroll",{"page_title":"Đăng kí","sport_list":sport_list});
=======
    sport_list.push({ "name": "football", "desc": "Bóng đá" });
    sport_list.push({ "name": "volleyball", "desc": "Bóng chuyền" });
    sport_list.push({ "name": "tabletenis", "desc": "Bóng bàn" });
    sport_list.push({ "name": "swimming", "desc": "Bơi chó" });
    res.render("enroll", { "sport_list": sport_list });
>>>>>>> 871c0bdebba29029a861f7393d3cbc7dee8540af
});
app.get('/testpost', function (req, res) {
    res.send('<html><body><form name="testpost" method="post" action="/testpost"><input type="submit" value="Post it" /></form></body></html>');
});
<<<<<<< HEAD
app.post('/Enrolluser',urlencodedParser, function (req, res) {
 
 res.setHeader("Content-Type", "text/html; charset=utf-8");
    var resObject={};
    resObject.firstname=req.body.firstname;
    resObject.lastname=req.body.lastname;
    resObject.age=req.body.age;
    resObject.sport_name=req.body.sport_name;
    user_list.push(resObject);
    res.render("list_user",{"page_title":"Danh sách người dùng","users":user_list});
    //res.end(JSON.stringify(foundObject));
   // res.send('Result: '+req.body.a1+"-"+req.body.a2);
=======
app.post('/enroll', urlencodedParser, function (req, res) {

    var user = {};
    user.first_name = req.body.firstname;
    user.last_name = req.body.lastname;
    user.age = req.body.age;
    user.sport_name = req.body.sport;
    user_list.push(user);
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    var resObject = {};
    resObject.firstName = req.body.a1;
    resObject.lastName = req.body.a2;
    res.render("list",{"users":user_list});
    // res.send('Result: '+req.body.a1+"-"+req.body.a2);
>>>>>>> 871c0bdebba29029a861f7393d3cbc7dee8540af
});
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
