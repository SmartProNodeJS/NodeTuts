var express = require('express');
var path = require('path');
var user_list=[];
var app = express();
var bodyParser = require("body-parser");
var urlencodedParser = bodyParser.urlencoded({ extended: false });
app.use(express.static("public/"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get('/', function (req, res) {

    res.render('enroll');
});
app.get('/enroll', function (req, res) {
    var sport_list = [];
    sport_list.push({ "name": "football", "desc": "Bóng đá" });
    sport_list.push({ "name": "volleyball", "desc": "Bóng chuyền" });
    sport_list.push({ "name": "tabletenis", "desc": "Bóng bàn" });
    sport_list.push({ "name": "swimming", "desc": "Bơi chó" });
    res.render("enroll", { "sport_list": sport_list });
});
app.get('/testpost', function (req, res) {
    res.send('<html><body><form name="testpost" method="post" action="/testpost"><input type="submit" value="Post it" /></form></body></html>');
});
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
});
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
