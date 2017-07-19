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
    userCol.find({},{}, function(err, matchs){
      if(err) {
        console.log(" Error: "+JSON.stringify(err));
      }else{
          res.render('matchs',{"page_title":"Matchs","matchs":matchs,"menu_items":menu_items});
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
      matchs.find({"_id":id}, {}, function(err, matchs){
      var sportcb = function(err, team_list){
           res.render('match',{"btn_caption":"Update", "page_title":"Edit Match","team_list":team_list,"match":matchs[0],"menu_items":menu_items});
           res.end();
        }
        
       if(err){
          console.log(JSON.stringify(err));
       }else{
         teams.find({},{}, sportcb);
       }
      });
    }else{
      var newmatch = {"_id":new ObjectID(),"match_name":"","datetime_start":"","datetime_end":"","team":"","score":"","sport_name":""}
      //res.render('match',{"btn_caption":"Add new","page_title":"Add New Match","match":newmatch,"menu_items":menu_items});
      teams.find({},{}, function(err, team_list){
           //res.render('player',{"btn_caption":"Add new","page_title":"Add New Player","sport_list":sport_list,"player":newplayer,"menu_items":menu_items});
           res.render('match',{"btn_caption":"Add new","page_title":"Add New Match","team_list":team_list,"match":newmatch,"menu_items":menu_items});
           res.end();
         });
    }
}); 

route.post('/',urlencodedParser,  function (req, res) {
  console.log("Request.body = "+JSON.stringify(req.body));
    var db = req.db;
    var user = {};
    var obj_id = req.body.obj_id;
    user.match_name = req.body.match_name;
    user.datetime_start = req.body.datetime_start;
    user.datetime_end = req.body.datetime_end;
    //user.team = req.body.team;
    user.score = req.body.score;
    db.get('teams').find({"name":req.body.team_name},{},function(err, s){
      user.team = s[0];
      var users = db.get("matchs");
      users.update({"_id":obj_id},user,{upsert: true}, function(err, added_user){
        if(err) {
          console.log(" Error: "+JSON.stringify(err));
        }else{
          res.redirect("/match/")
        }
      });    
    });
  
});

route.delete('/:id', function (req, res){
  var db = req.db;
  var userCol = db.get("matchs");
      userCol.remove({"_id":req.params.id},function(err, users){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json({status: true});
      } 
    });
});

module.exports = route;
