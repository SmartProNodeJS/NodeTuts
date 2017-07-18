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
    it.active = (it.name=='league')?"active":"";

  });
  next();
});

route.get("/", function(req, res) {
    var db = req.db;
    var leagueCol = db.get("leagues");
    leagueCol.find({},{}, function(err, leagues){
      if(err) {
        console.log(" Error: "+JSON.stringify(err));
      }else{
          res.render('leagues',{"page_title":"Leagues","leagues":leagues,"menu_items":menu_items});
      }
    });   
});

route.get('/:id',  function (req, res) {
    var db = req.db;
    var leagues = db.get("leagues");
    var sports = db.get("sports");
    var id = String(req.params.id);
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    if(idCheck.test(id)) {
      leagues.find({"_id":id}, {}, function(err, leagues){
        var sportcb = function(err, sport_list){
           res.render('leagues',{"btn_caption":"Update", "page_title":"Edit League","sport_list":sport_list,"match":matches[0],"menu_items":menu_items});
           res.end();
        }
       if(err){
          console.log(JSON.stringify(err));
       }else{
         sports.find({},{}, sportcb);
       }
      });
    }else{
      var newleague= {"_id":new ObjectID(),"league_name":"","number_match":"","sport_name":""}
         sports.find({},{}, function(err, sport_list){
           res.render('league',{"btn_caption":"Add new","page_title":"Add New League","sport_list":sport_list,"league":newleague,"menu_items":menu_items});
           res.end();
         });
    }
}); 

route.post('/',urlencodedParser,  function (req, res) {
  console.log("Request.body = "+JSON.stringify(req.body));
    var db = req.db;
    var league = {};
    var obj_id = req.body.obj_id;
    league.league_name = req.body.league_name;
    league.number_match = req.body.number_match;
    db.get('sports').find({"name":req.body.sport_name},{},function(err, s){
      league.sport = s[0];
      var leagues = db.get("matches");
      leagues.update({"_id":obj_id},league,{upsert: true}, function(err, added_league){
        if(err) {
          console.log(" Error: "+JSON.stringify(err));
        }else{
          res.redirect("/league/")
        }
      });    
    });
  
});

route.delete('/:id', function (req, res){
  var db = req.db;
  var leagueCol = db.get("leagues");
      leagueCol.remove({"_id":req.params.id},function(err, leagues){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json({status: true});
      } 
    });
});

module.exports = route;
