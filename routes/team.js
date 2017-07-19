var express = require('express');
var route = express.Router();
var bodyParser = require("body-parser");
var menu_items = require('../models/main_menu');
var ObjectID = require('mongodb').ObjectID;
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

route.use(function(req, res, next){
  menu_items.forEach(function(it){
    //console.log(it.name+" is "+it.active);
    it.active = (it.name=='team')?"active":"";

  });
  next();
});

route.get("/", function(req, res) {
    var db = req.db;
    var userCol = db.get("teams");
    userCol.find({},{}, function(err, teams){
      if(err) {
        console.log(" Error: "+JSON.stringify(err));
      }else{
        console.log(JSON.stringify(teams))
          res.render('teams',{"page_title":"teams","teams":teams,"menu_items":menu_items});
      }
    });   
});

route.get('/:id',  function (req, res) {
    var db = req.db;
    var teams = db.get("teams");
    var players = db.get("players");
    var id = String(req.params.id);
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    if(idCheck.test(id)) {
      teams.find({"_id":id}, {}, function(err, teams){
        var playercb = function(err, player_list){
          
           res.render('team',{"btn_caption":"Update", "page_title":"Edit team","player_list":player_list,"team":teams[0],"menu_items":menu_items});
           res.end();
        }
       if(err){
          console.log(JSON.stringify(err));
       }else{
         players.find({},{}, playercb);
       }
      });
    }else{
      var newteam = {"_id":new ObjectID(),"name":"","leader":"","player":""}
         players.find({},{}, function(err, player_list){
           res.render('team',{"btn_caption":"Add new","page_title":"Add New team","player_list":player_list,"team":newteam,"menu_items":menu_items});
           res.end();
         });
    }
}); 

route.post('/',urlencodedParser,  function (req, res) {
  console.log("Request.body = "+JSON.stringify(req.body));
    var db = req.db;
    var user = {};
    var obj_id = req.body.obj_id;
    user.name = req.body.name;
    user.leader = req.body.leader;
    user.player = req.body.player;
    
    db.get('players').find({"name":req.body.player_name},{},function(err, s){
      user.player = s[0];
      var users = db.get("teams");
      users.update({"_id":obj_id},user,{upsert: true}, function(err, added_user){
        if(err) {
          console.log(" Error: "+JSON.stringify(err));
        }else{
          res.redirect("/team/")
        }
      });    
    });
  
});

route.delete('/:id', function (req, res){
  var db = req.db;
  var userCol = db.get("teams");
      userCol.remove({"_id":req.params.id},function(err, users){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json({status: true});
      } 
    });
});

module.exports = route;
