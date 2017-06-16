var express = require('express');
var path = require('path');
var app = express();
var bodyParser=require("body-parser");
var user_list = [];
var urlencodedParser=bodyParser.urlencoded({extended:false});
app.use(express.static("public/"));
app.set("views" ,path.join(__dirname,"views"));
app.set("view engine","pug");

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
app.get('/testpost', function (req, res) {
    res.send('<html><body><form name="testpost" method="post" action="/testpost"><input type="submit" value="Post it" /></form></body></html>');
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
    //res.end(JSON.stringify(foundObject));
   // res.send('Result: '+req.body.a1+"-"+req.body.a2);
});
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
