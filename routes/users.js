var express = require('express');
var route = express.Router();
var bodyParser = require("body-parser");
var user_list = [];

var setUsers = function(req, res, next){
    req.users = user_list;
    next();
}
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
route.use(setUsers);
route.get("/", function(req, res) {
    if(!req.users){
       req.users = [];
    }
    res.render('list_user',{"page_title":"Registered Users","users":req.users});
});

route.post('/',urlencodedParser, function (req, res) {
    var user = {};
    user.first_name = req.body.first_name;
     user.last_name = req.body.last_name;
     user.age = req.body.age;
    user.sport_name = req.body.sport_name;
    user_list.push(user);
    res.redirect("/users/"); 
});

route.delete('/:last_name/:first_name',function (req, res){
  console.log("First Name: "+req.params.first_name+"\nLast Name: "+req.params.last_name);
  var result = {"status":false,"msgText":"User not found."};
  for(var i=0; i < user_list.length; i++){
      var user = user_list[i];
      if((user.first_name == req.params.first_name) &&
         (user.last_name == req.params.last_name)){
             user_list.splice(i,1);
             result["status"] = true;
             result.msgText = "User has been removed";
         }
  }
  res.json(result);
});

module.exports = route;
