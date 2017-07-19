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
    it.active = (it.name=='match')?"active":"";
  });
  next();
});

route.get("/", function(req, res) {
    var db = req.db;
    var matchCol = db.get("matchs");
    matchCol.find({},{}, function(err, matchs){
      if(err) {
        console.log(" Error: "+JSON.stringify(err));
      }else{
        res.render('matchs',{"page_title":"Match","matchs":matchs,"menu_items":menu_items});
      }
    });   
});

route.get('/:id/:sport_name?',  function (req, res) {
    var db = req.db;
    var matchs = db.get("matchs");
    var sports = db.get("sports");
    var match_type_list = db.get("match_type_list");
    var match_status_list = db.get("match_status_list");
    var teams = db.get("teams");
    var id = String(req.params.id);
    var sport_name = String(req.params.sport_name);
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    if(idCheck.test(id)) {
      matchs.find({"_id":id}, {}, function(err, matchs){
        sports.find({},{},function(err, sport_list){
          match_type_list.find({},{},function(err, match_type_list){
            match_status_list.find({},{},function(err, match_status_list){
              var teamcb = function(err, team_list){     
                res.render('match',{"btn_caption":"Update", "page_title":"Edit Match","sport_list":sport_list,"match":matchs[0],"menu_items":menu_items,"team_list":team_list,"match_type_list":match_type_list,"match_status_list":match_status_list,"url_action":"/match/update"});
                res.end();
              }
              if(err){
                  console.log(JSON.stringify(err));
              }else{
                teams.find({"sport.name":sport_name},{}, teamcb);
              }
            });
          });   
        });         
      });
    }else{
      var newmatch = {"_id":new ObjectID(),"match_type":"","match_time":"","match_date":"","match_status":"","match_score":"","sport":""}
         sports.find({},{}, function(err, sport_list){
           match_type_list.find({},{},function(err, match_type_list){
            match_status_list.find({},{},function(err, match_status_list){
              res.render('match',{"btn_caption":"Add new","page_title":"Add New Match","sport_list":sport_list,"match":newmatch,"menu_items":menu_items,"match_type_list":match_type_list,"match_status_list":match_status_list,"url_action":"/match/insert"});
              res.end();
          });
        });
      });
    }
}); 

route.post('/insert', urlencodedParser,  function (req, res) {
    var db = req.db;
    var match = {};
    var obj_id = req.body.obj_id;
    var teams = db.get("teams");
    match.match_date = req.body.match_date;
    match.match_time = req.body.match_time;
    match.match_score = req.body.match_score;

    db.get('sports').find({"name":req.body.sport_name},{},function(err, s){
      match.sport = s[0];
      db.get('match_type_list').find({"name":req.body.match_type},{},function(err, mtl){
        match.match_type = mtl[0];
        db.get('match_status_list').find({"name":req.body.match_status},{},function(err, mst){
          match.match_status = mst[0];
          var matchs = db.get("matchs");
          matchs.update({"_id":obj_id},match,{upsert: true}, function(err, added_match){
            if(err) {
              console.log(" Error: "+JSON.stringify(err));
            }else{
              res.redirect("/match/")
            }
          });  
        });
      });  
    });
});

route.post('/update', urlencodedParser,  function (req, res) {
    var db = req.db;
    var match = {};
    var obj_id = req.body.obj_id;
    var teams = db.get("teams");

    db.get('sports').find({"name":req.body.sport_name},{},function(err, s){
      db.get('match_type_list').find({"name":req.body.match_type},{},function(err, mtl){
        db.get('match_status_list').find({"name":req.body.match_status},{},function(err, mst){
          var matchs = db.get("matchs");
          matchs.update({"_id":obj_id}, { $set: {"match_type": mtl[0], "match_time": req.body.match_time,"match_date": req.body.match_date, "match_status": mst[0], "match_score": req.body.match_score, "sport": s[0] }}, function(err, added_match){
            if(err) {
              console.log(" Error: "+JSON.stringify(err));
            }else{
              res.redirect("/match/");
            }
          });  
        });
      });  
    });
});

route.post('/addteam', urlencodedParser, function (req, res){
  var db = req.db;
  var matchCol = db.get("matchs");
  var id = req.body.id;

  if(JSON.parse(req.body.match_team_list)){
    var data = JSON.parse(req.body.match_team_list);
    data.forEach(function(it){
      matchCol.update({ "_id": id},{ $push: {"team_list": it}});
    });
    res.json(true);
  }
  else{
    res.json(false);
  }
});

route.delete('/:id', function (req, res){
  var db = req.db;
  var matchCol = db.get("matchs");
      matchCol.remove({"_id":req.params.id},function(err, matchs){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json({status: true});
      } 
    });
});

route.delete('/deleteteam/:id/:team_id', function (req, res){
  var db = req.db;
  var matchCol = db.get("matchs");
  var id = req.params.id;
  var team_id = req.params.team_id;
  matchCol.update({"_id":id}, { $pull: {"team_list": {"_id": team_id}}}, function(err, deleteteam){
    if(err) {
      console.log(" Error: "+JSON.stringify(err));
    }else{
      res.json(true);
    }
  });
});

module.exports = route;