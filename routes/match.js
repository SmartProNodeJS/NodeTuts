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
    it.active = (it.name=='match')?"active":"";

  });
  next();
});

route.get("/", function(req, res) {
    var db = req.db;
    var userCol = db.get("matchs");
    userCol.find({},{}, function(err, players){
      if(err) {
        console.log(" Error: "+JSON.stringify(err));
      }else{
          res.render('matchs',{"page_title":"Matches","matchs":matchs,"menu_items":menu_items});
      }
    });   
});

route.get('/:id',  function (req, res) {
    var db = req.db;
    var matchs = db.get("matchs");
    var teams = db.get("teams");
    var id = String(req.params.id);
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    if(idCheck.test(id)) {
      matchs.find({"_id":id}, {}, function(err, players){
        var teamcb = function(err, team_list){
           res.render('match',{"btn_caption":"Update", "page_title":"Edit Match","team_list":team_list,"match":matchs[0],"menu_items":menu_items});
           res.end();
        }
       if(err){
          console.log(JSON.stringify(err));
       }else{
         teams.find({},{}, teamcb);
       }
      });
    }else{
      var newmatch = {"_id":new ObjectID(),"name":"","datetime_start":"","datetime_end":"","team1_name":"","team2_name":"",score_team1:"",score_team2:""}
         teams.find({},{}, function(err, sport_list){
           res.render('match',{"btn_caption":"Add new","page_title":"Add New Match","team_list":team_list,"match":newmatch,"menu_items":menu_items});
           res.end();
         });
    }
}); 

route.post('/',urlencodedParser,  function (req, res) {
  console.log("Request.body = "+JSON.stringify(req.body));
    var db = req.db;
    var match = {};
    var obj_id = req.body.obj_id;
    match.name = req.body.match_name;
    match.datetime_start = req.body.datetime_start;
    match.datetime_end = req.body.datetime_end;
    db.get('team').find({"name":req.body.team1_name},{},function(err, s){
      match.team1 = s[0];
      var matchs = db.get("match");
      matchs.update({"_id":obj_id},match,{upsert: true}, function(err, added_match){
        if(err) {
          console.log(" Error: "+JSON.stringify(err));
        }else{
          res.redirect("/match/")
        }
      });    
    });
    db.get('team').find({"name":req.body.team2_name},{},function(err, s){
      match.team2 = s[0];
      var matchs = db.get("match");
      matchs.update({"_id":obj_id},match,{upsert: true}, function(err, added_match){
        if(err) {
          console.log(" Error: "+JSON.stringify(err));
        }else{
          res.redirect("/match/")
        }
      });    
    });
    match.score.team1 = req.body.score_team1;
    match.score.team2 = req.body.score_team2;
  
});

route.delete('/:id', function (req, res){
  var db = req.db;
  var matchCol = db.get("match");
      userCol.remove({"_id":req.params.id},function(err, users){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json({status: true});
      } 
    });
});

module.exports = route;
