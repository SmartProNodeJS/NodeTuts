var express = require('express');
var mongodb = require('mongodb');
var route = express.Router();
var menu_items = require('../models/main_menu');
var bodyParser = require("body-parser");
var sports = [  {"name":"Football","desc":"Bong da"},
                {"name":"volleyball","desc":"Bong chuyen"},
                {"name":"table_tennis","desc":"Bong ban"},
                {"name":"swimming","desc":"Boi/Loi"}
             ];
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
route.get("/", function(req, res) {
    var db = req.db;
    var userCol = db.get("players");
    userCol.find({},{}, function(err, players){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        console.log("Players: "+JSON.stringify(players));
        res.render('players',{"page_title":"Players","players":players,"menu_items":menu_items});
      }
    });   
});

route.get('/:id', function (req, res) {
    var db = req.db;
    var players = db.get("players");
    var id = String(req.params.id).trim();
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    console.log("Id: "+id);
    if(idCheck.test(id)) {
      players.find({"_id":id}, {}, function(err, players){
       if(err){
          console.log(JSON.stringify(err));
       }else{
           console.log("Edit Player: "+JSON.stringify(players[0]));
           res.render('player',{"page_title":"Edit Player","sport_list":sports,"player":players[0]});
           res.end();
       }
      });
    }else{
      res.render('player',{"page_title":"Add New Player","sport_list":sports,"player":{}});  
    }
}); 

route.post('/',urlencodedParser, function (req, res) {
    var user = {};
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.age = req.body.age;
    user.sport_name = req.body.sport_name;
    var db = req.db;
    var users = db.get("players");



    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");
     console.log("gggggggg");
    var id = String(req.body._id).trim();
   if(idCheck.test(id)) {
      users.find({"_id":id}, {}, function(err, players){ 
        console.log("idddd: "+id + JSON.stringify(players[0]));
       if(err){
          console.log(JSON.stringify(err));
       }else{
          if(!players || JSON.stringify(players[0]) == undefined){  //tìm ko thấy, insert
            console.log("insert");
              users.insert(user, function(err, added_user){
              if(err) {
                  console.log(" Error: "+JSON.stringify(err));
              }else{
                res.redirect("/player/")
              }
            });
          }
          else
          {
            console.log("update");
            users.update({_id:id}, {$set: {first_name:user.first_name,last_name:user.last_name,age:user.age,sport_name:user.sport_name}}, function(err, edit_player){
              if(err) {
                  console.log(" Error: "+JSON.stringify(err));
              }else{
                res.redirect("/player/")
              }
              });
          }
       }
      });
    }else{
      console.log("insertttttt");
      users.insert(user, function(err, addedd_user){
              if(err) {
                  console.log(" Error: "+JSON.stringify(err));
              }else{
                res.redirect("/player/")
              }
            });
      res.render('player',{"page_title":"Add New Player","sport_list":sports,"player":{}});  
    }

    
});

route.delete('/:id',function (req, res){
  var db = req.db;
  var userCol = db.get("players");
      userCol.remove({"_id":req.params.id},function(err, users){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json({status: true});
      } 
    });   
});

module.exports = route;
