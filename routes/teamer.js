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
    it.active = (it.name=='teamer')?"active":"";

  });
  next();
});

route.get("/", function(req, res) {
    var db = req.db;
    var userCol = db.get("teamers");
    userCol.find({},{}, function(err, teamers){
      if(err) {
        console.log(" Error: "+JSON.stringify(err));
      }else{
          res.render('teamers',{"page_title":"teamers","teamers":teamers,"menu_items":menu_items});
      }
    });   
});

route.get('/:id',  function (req, res) {
    var db = req.db;
    var teamers = db.get("teamers");
    var sports = db.get("sports");
    var id = String(req.params.id);
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    if(idCheck.test(id)) {
      teamers.find({"_id":id}, {}, function(err, teamers){
        var sportcb = function(err, sport_list){
           res.render('teamer',{"btn_caption":"Update", "page_title":"Edit teamer","sport_list":sport_list,"teamer":teamers[0],"menu_items":menu_items});
           res.end();
        }
       if(err){
          console.log(JSON.stringify(err));
       }else{
         sports.find({},{}, sportcb);
       }
      });
    }else{
      var newteamer = {"_id":new ObjectID(),"team_name":"","player_number":"","sport_name":""}
         sports.find({},{}, function(err, sport_list){
           res.render('teamer',{"btn_caption":"Add new","page_title":"Add New teamer","sport_list":sport_list,"teamer":newteamer,"menu_items":menu_items});
           res.end();
         });
    }
}); 

route.post('/',urlencodedParser,  function (req, res) {
  console.log("Request.body = "+JSON.stringify(req.body));
    var db = req.db;
    var user = {};
    var obj_id = req.body.obj_id;
    user.team_name = req.body.team_name;
    user.player_number = req.body.player_number;
    db.get('sports').find({"name":req.body.sport_name},{},function(err, s){
      user.sport = s[0];
      var users = db.get("teamers");
      users.update({"_id":obj_id},user,{upsert: true}, function(err, added_user){
        if(err) {
          console.log(" Error: "+JSON.stringify(err));
        }else{
          res.redirect("/teamer/")
        }
      });    
    });
  
});

route.delete('/:id', function (req, res){
  var db = req.db;
  var userCol = db.get("teamers");
      userCol.remove({"_id":req.params.id},function(err, users){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json({status: true});
      } 
    });
});

module.exports = route;
