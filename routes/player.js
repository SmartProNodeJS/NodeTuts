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
    it.active = (it.name=='player')?"active":"";

  });
  next();
});

route.get("/", function(req, res) {
    var db = req.db;
    var userCol = db.get("players");
    userCol.find({},{}, function(err, players){
      if(err) {
        console.log(" Error: "+JSON.stringify(err));
      }else{
          res.render('players',{"page_title":"Players","players":players,"menu_items":menu_items});
      }
    });   
});

route.get('/:id',  function (req, res) {
    var db = req.db;
    var players = db.get("players");
    var sports = db.get("sports");
    var sex = db.get("sex");
    var id = String(req.params.id);
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    if(idCheck.test(id)) {
      players.find({"_id":id}, {}, function(err, players){
        sex.find({},{},function(err,sex_list){
          var sportcb = function(err, sport_list){
           res.render('player',{"btn_caption":"Update", "page_title":"Edit Player","sport_list":sport_list,"player":players[0],"menu_items":menu_items,"sex":sex_list});
           res.end();
        }
       if(err){
          console.log(JSON.stringify(err));
       }else{
         sports.find({},{}, sportcb);
       }
        });
      });
    }else{
      var newplayer = {"_id":new ObjectID(),"first_name":"","last_name":"","age":"","sex":"","sport_name":""}
         sports.find({},{}, function(err, sport_list){
           sex.find({},{},function(err, sex_list){
            res.render('player',{"btn_caption":"Add new","page_title":"Add New Player","sport_list":sport_list,"player":newplayer,"menu_items":menu_items,"sex":sex_list});
            res.end();
           });
         });
    }
}); 

route.post('/',urlencodedParser,  function (req, res) {
  console.log("Request.body = "+JSON.stringify(req.body));
    var db = req.db;
    var user = {};
    var obj_id = req.body.obj_id;
    user.first_name = req.body.first_name;
    user.last_name = req.body.last_name;
    user.age = req.body.age;
    db.get('sports').find({"name":req.body.sport_name},{},function(err, s){
      db.get('sex').find({"name":req.body.sex_name},{},function(err, sex_list){
          console.log(sex_list[0]);
          user.sport = s[0];
          user.sex = sex_list[0];
          var users = db.get("players");
          users.update({"_id":obj_id},user,{upsert: true}, function(err, added_user){
          if(err) {
            console.log(" Error: "+JSON.stringify(err));
          }else{
            res.redirect("/player/")
          }
        }); 
      }); 
    });
  
});

route.delete('/:id', function (req, res){
  var db = req.db;
  var userCol = db.get("players");
      userCol.remove({"_id":req.params.id},function(err, users){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json({status: true});
      } 
    });
});

module.exports = route;
