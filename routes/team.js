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
        res.render('registerTeam',{"page_title":"Register Team","player_list":players,"team":[]});
      }
    });   
    //res.render('registerTeam',{"page_title":"Register Team","team":[]});
}); 

// route.get("/GeT_List_Player", function(req, res) {
//     var db = req.db;
//     var userCol = db.get("players");
//     userCol.find({},{}, function(err, players){
//       if(err) {
//           console.log(" Error: "+JSON.stringify(err));
//       }else{
//         console.log("Teams: "+JSON.stringify(players));
//         return
//       }
//     });   
// });

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

// route.get('/:id', function (req, res) {
//     var db = req.db;
//     var teams = db.get("teams");
//     var id = String(req.params.id).trim();
//     var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

//     console.log("Id: "+id);
//     if(idCheck.test(id)) {
//       teams.find({"_id":id}, {}, function(err, teams){
//        if(err){
//           console.log(JSON.stringify(err));
//        }else{
//            console.log("Edit Teams: "+JSON.stringify(teams[0]));
//            res.render('team',{"page_title":"Edit Team","player_list":players,"player":teams[0]});
//            res.end();
//        }
//       });
//     }else{
//       res.render('player',{"page_title":"Add New Player","sport_list":sports,"player":{}});  
//     }
// }); 

route.post('/',urlencodedParser, function (req, res) {
    var team = {};
    team.name = req.body.name;

    var db = req.db;
    var teams = db.get("teams");



    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");
     console.log("gggggggg");
    var id = String(req.body._id).trim();
   if(idCheck.test(id)) {
      // users.find({"_id":id}, {}, function(err, players){ 
      //   console.log("idddd: "+id + JSON.stringify(players[0]));
      //  if(err){
      //     console.log(JSON.stringify(err));
      //  }else{
      //     if(!players || JSON.stringify(players[0]) == undefined){  //tìm ko thấy, insert
      //       console.log("insert");
      //         users.insert(user, function(err, added_user){
      //         if(err) {
      //             console.log(" Error: "+JSON.stringify(err));
      //         }else{
      //           res.redirect("/player/")
      //         }
      //       });
      //     }
      //     else
      //     {
      //       console.log("update");
      //       users.update({_id:id}, {$set: {first_name:user.first_name,last_name:user.last_name,age:user.age,sport_name:user.sport_name}}, function(err, edit_player){
      //         if(err) {
      //             console.log(" Error: "+JSON.stringify(err));
      //         }else{
      //           res.redirect("/player/")
      //         }
      //         });
      //     }
      //  }
      // });
    }else{
      console.log("insertttttt");
      teams.insert(team, function(err, addedd_team){
              if(err) {
                  console.log(" Error: "+JSON.stringify(err));
              }else{
                res.redirect("/player/")
              }
            });
      res.render('player',{"page_title":"Add New Player","player":{}});  
    }

    
});

route.delete('/:id',function (req, res){
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
