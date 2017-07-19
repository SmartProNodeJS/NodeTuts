var express = require('express');
var route = express.Router();
var bodyParser = require("body-parser");
var menu_items = require('../models/main_menu');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
route.get("/", function(req, res) {
    var db = req.db;
    var userCol = db.get("users");
    userCol.find({},{}, function(err, users){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.render('list_user',{"page_title":"Registered Users","users":users,"menu_items":menu_items});
      }
    });   
});

route.post('/',urlencodedParser, function (req, res) {
    var user = {};
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.age = req.body.age;
    user.sport_name = req.body.sport_name;
    var db = req.db;
    var users = db.get("users");
    users.insert(user, function(err, added_user){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.redirect("/users/")
      }
    });
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
