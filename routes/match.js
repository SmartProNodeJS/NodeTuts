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
    var matchCol = db.get("matches");
    matchCol.find({},{}, function(err, matches){
      if(err) {
        console.log(" Error: "+JSON.stringify(err));
      }else{
          res.render('matches',{"page_title":"Matches","matches":matches,"menu_items":menu_items});
      }
    });   
});

route.get('/:id',  function (req, res) {
    var db = req.db;
    var matches = db.get("matches");
    var sports = db.get("sports");
    var id = String(req.params.id);
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    if(idCheck.test(id)) {
      matches.find({"_id":id}, {}, function(err, matches){
        var sportcb = function(err, sport_list){
           res.render('matches',{"btn_caption":"Update", "page_title":"Edit Match","sport_list":sport_list,"match":matches[0],"menu_items":menu_items});
           res.end();
        }
       if(err){
          console.log(JSON.stringify(err));
       }else{
         sports.find({},{}, sportcb);
       }
      });
    }else{
      var newmatch= {"_id":new ObjectID(),"match_name":"","number_team":"","sport_name":""}
         sports.find({},{}, function(err, sport_list){
           res.render('match',{"btn_caption":"Add new","page_title":"Add New Match","sport_list":sport_list,"match":newmatch,"menu_items":menu_items});
           res.end();
         });
    }
}); 

route.post('/',urlencodedParser,  function (req, res) {
  console.log("Request.body = "+JSON.stringify(req.body));
    var db = req.db;
    var match = {};
    var obj_id = req.body.obj_id;
    match.match_name = req.body.match_name;
    match.number_team = req.body.number_team;
    db.get('sports').find({"name":req.body.sport_name},{},function(err, s){
      match.sport = s[0];
      var matches = db.get("matches");
      matches.update({"_id":obj_id},match,{upsert: true}, function(err, added_match){
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
  var matchCol = db.get("matches");
      matchCol.remove({"_id":req.params.id},function(err, matches){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json({status: true});
      } 
    });
});

module.exports = route;
