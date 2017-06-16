const path = require("path");

var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var user_list = [];
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("public/"));
app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");

app.get('/', urlencodedParser, function (req, res) {
    res.render("index",{username:req.query.un});
});
app.get('/reg', function (req, res) {
    var sport_list = [];
        sport_list.push({"name":"Football","desc":"Bong da"});
        sport_list.push({"name":"volleyball","desc":"Bong chuyen"});
        sport_list.push({"name":"table_tennis","desc":"Bong ban"});
        sport_list.push({"name":"swimming","desc":"Boi/Loi"});
    res.render('register',{"page_title":"Register User","sport_list":sport_list});
}); 

app.post('/registerUser',urlencodedParser, function (req, res) {
    var user = {};
    user.first_name = req.body.first_name;
     user.last_name = req.body.last_name;
     user.age = req.body.age;
    user.sport_name = req.body.sport_name;
    user_list.push(user);
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.render('list_user',{"page_title":"Registered Users","users":user_list}); 
});
var server = app.listen(8081, function () {
var host = server.address().address,
    port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
});