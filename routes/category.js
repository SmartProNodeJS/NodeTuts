var express = require('express');
var route = express.Router();
var bodyParser = require("body-parser");
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

route.get("/list_match_teams/:sport_name", function(req, res) {
    var db = req.db;
    var teamCol = db.get("teams");
    console.log(req.params.sport_name);
    teamCol.find({"sport.name":req.params.sport_name},{}, function(err, teams){
      if(err) {
        console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json(teams);
      }
    });   
});

route.get("/team_list_players/:sport_name", function(req, res) {
    var db = req.db;
    var playerCol = db.get("players");
    playerCol.find({"sport.name":req.params.sport_name},{}, function(err, players){
      if(err) {
        console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json(players);
      }
    });   
});
route.get("/list_match_league/:sport_name", function(req, res) {
    var db = req.db;
    var matchCol = db.get("matchs");
    console.log(req.params.sport_name);
    matchCol.find({"sport.name":req.params.sport_name},{}, function(err, matchs){
      if(err) {
        console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json(matchs);
      }
    });   
});
module.exports = route;