var express = require('express');
var route = express.Router();
var bodyParser = require("body-parser");
var menu_items = require('../models/main_menu');
var players_model = require('../models/players');
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
          res.render('teams',{"page_title":"Teams","teams":teams,"menu_items":menu_items});
      }
    });   
});

route.get('/:id/:sport_name?',  function (req, res) {
    var db = req.db;
    var teams = db.get("teams");
    var sports = db.get("sports");
    var players = db.get("players");
    var id = String(req.params.id);
    var sport_name = String(req.params.sport_name);
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    if(idCheck.test(id)) {
      teams.find({"_id":id}, {}, function(err, teams){
        sports.find({},{},function(err, sport_list){
          var playercb = function(err, player_list){     
            res.render('team',{"btn_caption":"Update", "page_title":"Edit Team","sport_list":sport_list,"team":teams[0],"menu_items":menu_items,"player_list":player_list,"url_action":"/team/update"});
            res.end();
          }
          if(err){
              console.log(JSON.stringify(err));
          }else{
            players.find({"sport.name":sport_name},{}, playercb);
          }
        });         
      });
    }else if(id == "add"){
      var newteam = {"_id":new ObjectID(),"team_name":"","number_player":"","sport":""}
         sports.find({},{}, function(err, sport_list){
           res.render('team',{"btn_caption":"Add new","page_title":"Add New Team","sport_list":sport_list,"team":newteam,"menu_items":menu_items,"url_action":"/team/insert"});
           res.end();
         });
    }
}); 

route.post('/insert', urlencodedParser,  function (req, res) {
    var db = req.db;
    var team = {};
    var obj_id = req.body.obj_id;
    var players = db.get("players");
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

route.post('/update', urlencodedParser,  function (req, res) {
    var db = req.db;
    var team = {};
    var obj_id = req.body.obj_id;
    var players = db.get("players");

    db.get('sports').find({"name":req.body.sport_name},{},function(err, s){
      var teams = db.get("teams");
      teams.update({"_id":obj_id}, { $set: {"team_name": req.body.team_name, "number_player": req.body.number_player, "sport": s[0] }}, function(err, added_team){
        if(err) {
          console.log(" Error: "+JSON.stringify(err));
        }else{
          res.redirect("/team/");
        }
      });    
    });
});

route.post('/addplayer', urlencodedParser, function (req, res){
  var db = req.db;
  var teamCol = db.get("teams");
  var id = req.body.id;

  if(JSON.parse(req.body.team_player_list)){
    var data = JSON.parse(req.body.team_player_list);
    data.forEach(function(it){
      teamCol.update({ "_id": id},{ $push: {"player_list": it}});
    });
    res.json(true);
  }
  else{
    res.json(false);
  }
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

route.delete('/deleteplayer/:id/:player_id', function (req, res){
  var db = req.db;
  var teamCol = db.get("teams");
  var id = req.params.id;
  var player_id = req.params.player_id;
  teamCol.update({"_id":id}, { $pull: {"player_list": {"_id": player_id}}}, function(err, deleteplayer){
    if(err) {
      console.log(" Error: "+JSON.stringify(err));
    }else{
      res.json(true);
    }
  });
});

module.exports = route;