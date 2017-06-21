var express = require('express');
var userRoute = require('./routes/users.js');
var path = require('path');
var app = express();
var bodyParser=require("body-parser");
var user_list = [];
var urlencodedParser=bodyParser.urlencoded({extended:false});
app.use(express.static("public/"));
app.set("views" ,path.join(__dirname,"views"));
app.set("view engine","pug");

app.get('/', function (req, res) 
{
    var user_list=[];
    var app = express();
    var bodyParser = require("body-parser");
    var urlencodedParser = bodyParser.urlencoded({ extended: false });
    app.use(express.static("public/"));
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "pug");
});

    app.get('/', function (req, res) {
        res.render('enroll');
});
app.get('/enroll', function (req, res) {
    var sport_list = [];
    sport_list.push({"name":"Football", "desc":"Bóng đá"});
    sport_list.push({"name":"Swim", "desc":"Bơi"});
    sport_list.push({"name":"Tennis", "desc":"Quần vợt"});
    res.render("enroll",{"page_title":"Đăng kí","sport_list":sport_list});
});
app.get('/Enrolluser/:l_n/:f_n/:age[0-9]{2}', function (req, res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    var resObject={};
    resObject.firstname=req.body.firstname;
    resObject.lastname=req.body.lastname;
    resObject.age=req.body.age;
    resObject.sport_name=req.body.sport_name;
    user_list.push(resObject);
    res.render("list_user",{"page_title":"Danh sách người dùng","users":user_list});
});
app.post('/Enrolluser',urlencodedParser, function (req, res) {
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    var resObject={};
    resObject.firstname=req.body.firstname;
    resObject.lastname=req.body.lastname;
    resObject.age=req.body.age;
    resObject.sport_name=req.body.sport_name;
    user_list.push(resObject);
    res.render("list_user",{"page_title":"Danh sách người dùng","users":user_list});
});
app.use(userRoute);
var server = app.listen(8081, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})
