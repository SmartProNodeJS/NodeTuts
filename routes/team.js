var express = require('express');
var mongodb = require('mongodb');
var route = express.Router();
var bodyParser = require("body-parser");
var menu_items = require('../models/main_menu');

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

route.get('/add', function (req, res) {
   var db = req.db;
    var userCol = db.get("players");
    userCol.find({},{}, function(err, players){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        console.log("Player: "+JSON.stringify(players));
        res.render('registerTeam',{"page_title":"Register Team","player_list":players,"player_list2":players,"team":[]});
      }
    });   

}); 



route.get("/", function(req, res) {
    var db = req.db;
    var userCol = db.get("teams");
    userCol.find({},{}, function(err, teams){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        console.log("Teams: "+JSON.stringify(teams));
        res.render('teams',{"page_title":"Teams","teams":teams,"menu_items":menu_items});
      }
    });   
});
route.get("/showteam/:id", function(req, res) {
    var db = req.db;
    var teams = db.get("teams");
    var id = String(req.params.id).trim();
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    console.log("Id: "+id);
    if(idCheck.test(id)) {
      teams.find({"_id":id}, {}, function(err, teams){
       if(err){
          console.log(JSON.stringify(err));
       }else{
         var userCol2 = db.get("players");
          userCol2.find({},{}, function(err, players){
           console.log("Show Team: "+JSON.stringify(teams[0]));
           res.render('showTeam',{"page_title":"Show Team","player_list":players,"player_list2":players,"team":teams[0],"menu_items":menu_items});
           res.end();
          });          
       }
      });
    }else{
      //res.render('player',{"page_title":"Add New Player","sport_list":sports,"player":{}});  
    }
});

route.get('/:id', function (req, res) {
    var db = req.db;
    var teams = db.get("teams");
    var id = String(req.params.id).trim();
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

    console.log("Id: "+id);
    if(idCheck.test(id)) {
      teams.find({"_id":id}, {}, function(err, teams){
       if(err){
          console.log(JSON.stringify(err));
       }else{
         var userCol2 = db.get("players");
          userCol2.find({},{}, function(err, players){
           console.log("Edit Team: "+JSON.stringify(teams[0]));
           res.render('registerTeam',{"page_title":"Edit Team","player_list":players,"player_list2":players,"team":teams[0],"menu_items":menu_items});
           res.end();
          });          
       }
      });
    }else{
      //res.render('player',{"page_title":"Add New Player","sport_list":sports,"player":{}});  
    }
}); 

route.post('/',urlencodedParser, function (req, res) {
    var team = {};
    team.id = req.body._id;
    team.name = req.body.name;
    team.Leader = req.body.Leader;
    team.AddPlayer = req.body.AddPlayer;
  console.log("mmm" + team.id + " - " + team.name + " - " + team.Leader + " - " + team.AddPlayer);
    var db = req.db;
    var teams = db.get("teams");



    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");
     console.log("gggggggg");
    var id = String(req.body._id).trim();
    console.log("id");
   
   if(idCheck.test(id)) {
      teams.find({"_id":id}, {}, function(err, teams){ 
        console.log("idddd: "+id + JSON.stringify(teams[0]));
       if(err){
          console.log(JSON.stringify(err));
       }else{
          if(!teams || JSON.stringify(teams[0]) == undefined){  //tìm ko thấy, insert
            console.log("insert");
              teams.insert(team, function(err, added_user){
              if(err) {
                  console.log(" Error: "+JSON.stringify(err));
              }else{
                res.redirect("/team/")
              }
            });
          }
          else
          {
            console.log("update " + id);
             var teams2 = db.get("teams");
            //teams.update({"_id":team.id}, {$set: {"name":"kkk","Leader":"596ca80b04f8491060089a5a","AddPlayer":"596ca80b04f8491060089a5d"}}, function(err, edit_team){
              //teams.update({_id:id}, {$set: {id:0,name:team.name,Leader:team.Leader,AddPlayer:team.AddPlayer}}, function(err, edit_team){
              teams2.update({"_id":id},team,{upsert: true}, function(err, added_team){
              if(err) {
                  console.log(" Error: "+JSON.stringify(err));
              }else{
                res.redirect("/team/")
              }
              });
          }
       }
      });
    }else{
      console.log("insertttttt");
      teams.insert(team, function(err, addedd_team){
              if(err) {
                  console.log(" Error: "+JSON.stringify(err));
              }else{
                res.redirect("/team/")
              }
            });
              var userCol4 = db.get("players");
              userCol4.find({},{}, function(err, players){
                if(err) {
                    console.log(" Error: "+JSON.stringify(err));
                }else{
                  console.log("Player: "+JSON.stringify(players));
                  res.render('registerTeam',{"page_title":"Register Team","player_list":players,"player_list2":players,"team":[]});
                }
              });   
    }

    

    
});

route.delete('/:id',function (req, res){
  var db = req.db;
  console.log(" delete: "+req.params.id);
  var userCol = db.get("teams");
      userCol.remove({"_id":req.params.id},function(err, users){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.json({status: true});
      } 
    });   
});

module.exports = route;
