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
          res.render('teams',{"page_title":"Teams","teams":teams,"menu_items":menu_items});
      }
    });   
});

route.get('/:id',  function (req, res) {
    var db = req.db;
    var teams = db.get("teams");
    var sports = db.get("sports");
    var id = String(req.params.id);
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    if(idCheck.test(id)) {
      teams.find({"_id":id}, {}, function(err, teams){
        var sportcb = function(err, sport_list){
           res.render('player',{"btn_caption":"Update", "page_title":"Edit Team","sport_list":sport_list,"team":teams[0],"menu_items":menu_items});
           res.end();
        }
       if(err){
         console.log('error leagues');
          console.log(JSON.stringify(err));
       }else{
         sports.find({},{}, sportcb);
       }
      });
    }else{
      var newteam = {"_id":new ObjectID(),"first_name":"","last_name":"",init_year:"","sport_name":""}
         sports.find({},{}, function(err, sport_list){
           res.render('team',{"btn_caption":"Add new","page_title":"Add New Team","sport_list":sport_list,"team":newteam,"menu_items":menu_items});
           res.end();
         });
    }
}); 

route.post('/',urlencodedParser,  function (req, res) {
  console.log("Request.body = "+JSON.stringify(req.body));
    var db = req.db;
    var teamer = {};
    var obj_id = req.body.obj_id;
    teamer.first_name = req.body.first_name;
    teamer.last_name = req.body.last_name;
    teamer.init_year = req.body.init_year;
    db.get('sports').find({"name":req.body.sport_name},{},function(err, s){
      teamer.sport = s[0];
      var teamers = db.get("teams");
      teamers.update({"_id":obj_id},teamer,{upsert: true}, function(err, added_teamer){
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
