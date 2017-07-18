var express = require('express');
var route = express.Router();
var bodyParser = require("body-parser");
var menu_items = require('../models/main_menu');
var player = require('../models/player');
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
    var teamCol = db.get("teams");
    teamCol.find({},{}, function(err, teams){
      if(err) {
        console.log(" Error: "+JSON.stringify(err));
      }else{
          res.render('teams',{"page_title":"Teams","teams":teams,"menu_items":menu_items});
      }
    });   
});

route.get('/:id',  function (req, res) {
    var db = req.db;
    var teams = db.get("teams");
    var sports = db.get("sports");
    var players = db.get("players");
    var id = String(req.params.id);
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    if(idCheck.test(id)) {
      teams.find({"_id":id}, {}, function(err, teams){
        var sportcb = function(err, sport_list){
            res.render('team',{"btn_caption":"Update", "page_title":"Edit Team","sport_list":sport_list,"team":teams[0],"players":players,"menu_items":menu_items});
            res.end();
        }
       if(err){
          console.log(JSON.stringify(err));
       }else{
         players.find({"sport_name":teams.sport.name},{}, sportcb);
       }
      });
    }else{
      var newteam = {"_id":new ObjectID(),"team_name":"","number_player":"","sport":""}
         sports.find({},{}, function(err, sport_list){
           res.render('team',{"btn_caption":"Add new","page_title":"Add New Team","sport_list":sport_list,"team":newteam,"menu_items":menu_items});
           res.end();
         });
    }
}); 

route.post('/',urlencodedParser,  function (req, res) {
  console.log("Request.body = "+JSON.stringify(req.body));
    var db = req.db;
    var team = {};
    var obj_id = req.body.obj_id;
    team.team_name = req.body.team_name;
    team.number_player = req.body.number_player;
    db.get('sports').find({"name":req.body.sport_name},{},function(err, s){
      team.sport = s[0];
      var teams = db.get("teams");
      teams.update({"_id":obj_id},team,{upsert: true}, function(err, added_team){
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
  var teamCol = db.get("teams");
      teamCol.remove({"_id":req.params.id},function(err, teams){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json({status: true});
      } 
    });
});

module.exports = route;
