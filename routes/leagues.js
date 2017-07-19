var express = require('express');
var route = express.Router();
var bodyParser = require("body-parser");
var menu_items = require('../models/main_menu');

// Create application/x-www-form-urlencoded parser

var urlencodedParser = bodyParser.urlencoded({ extended: false });

route.get('/regLeague', function (req, res) {
    var name= req.query.name, start=req.query.start, end = req.query.start, place = req.query.place, is_double = req.query.is_double;
    //if(name==undefined)
    //  name = req.params.f_n+"("+req.params.age+")";
    //if(last_name==undefined)
    //  last_name = req.params.l_n;
    var sport_list = [];
        sport_list.push({"name":"Football","desc":"Bong da"});
        sport_list.push({"name":"volleyball","desc":"Bong chuyen"});
        sport_list.push({"name":"table_tennis","desc":"Bong ban"});
        sport_list.push({"name":"swimming","desc":"Boi/Loi"});
        //sport_list.push({"name":last_name,"desc":first_name});
    res.render('registerLeague',{"page_title":"Register League","sport_list":sport_list});
}); 


route.get("/", function(req, res) {
    var db = req.db;
    var LeagueCol = db.get("leagues");
    LeagueCol.find({},{}, function(err, leagues){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        console.log("Leagues: "+JSON.stringify(leagues));
        res.render('list_league',{"page_title":"Registered Leagues","leagues":leagues,"menu_items":menu_items});
      }
    });   
});

route.post('/',urlencodedParser, function (req, res) {
    var league = {};
    console.log(req.body._id)
    league.name = req.body.name;
    league.start = req.body.start;
    league.end = req.body.end;
    league.place = req.body.place;
    league.sport = req.body.sport;
    league.is_double = req.body.is_double;
    var db = req.db;
    var leagues = db.get("leagues");
    //var name = String(req.params.name);
    //var _id = String(req.body._id);
    console.log("name--" + req.body._id)
    if(req.body._id.length< 12) // < 12, tức insert
    {
        leagues.insert(league, function(err, added_league){
                        if(err) {
                            console.log(" Error: "+JSON.stringify(err));
                        }else{
                            res.redirect("/leagues/")
                        }  
                    });
    }
    else //> 12, có thể update
    {
        leagues.find({"_id":req.body._id},{},function(err, leaguess){ 
            if(!err)
            {
                console.log("mmmm--" + JSON.stringify(leaguess[0]) )
                if(!leaguess || JSON.stringify(leaguess[0]) == undefined){  //tìm ko thấy, insert
                    console.log("insert")
                    leagues.insert(league, function(err, added_league){
                        if(err) {
                            console.log(" Error: "+JSON.stringify(err));
                        }else{
                            res.redirect("/leagues/")
                        }  
                    });
                }else{ // tìm thấy, update
                    console.log("update")
                    leagues.update({_id:req.body._id}, {$set: {name:league.name,start:league.start,end:league.end,place:league.place,sport:league.sport,is_double:league.is_double}}, function(err, edit_league){
                        if(err) {
                            console.log(" Error: "+JSON.stringify(err));
                        }else{
                            res.redirect("/leagues/")
                        }  
                    });
                }     
            }
            else
            {
                console.log(" Error: "+JSON.stringify(err));
            }
        });
    }
    
});

route.get('/:id',urlencodedParser, function (req, res) {
    console.log("Name: "+req.params.id);
    var db = req.db;
    var leagues = db.get("leagues");
    //var name = String(req.params._id);
    //console.log("Name: "+name);
    leagues.find({"_id":req.params.id},{},function(err, leagues){
      if(!err){
          console.log("Name: "+JSON.stringify(leagues[0]));
          res.render('editLeague',{"page_title":"Editttttt League","league":leagues[0]});   
      }else{
        console.log(" Error: "+JSON.stringify(err));
      }     
    });
});

route.get('/:id/:name',urlencodedParser, function (req, res) {
   var db = req.db;
   var id = (req.params.id).toString().trim();
   console.log(id);
    var leagues = db.get("leagues");
    //leagues.remove({},{});
    leagues.remove({"_id":id},function(err, leagues){
      if(!err){
          res.redirect("/leagues/")
      }else{
        console.log(" Error: "+JSON.stringify(err));
      }     
    });
});
route.delete('/:id/:name',function (req, res){
    console.log("---------------1");
  console.log("id: "+req.params.name+"\nname: "+req.params.sport);
  var result = {"status":false,"msgText":"League not found."};
  for(var i=0; i < league_list.length; i++){
      var league = league_list[i];
      if((league.name == req.params.name) &&
         (league.sport == req.params.sport)){
             league_list.splice(i,1);
             result["status"] = true;
             result.msgText = "Leagues has been removed";
         }
  }
  res.json(result);
});

module.exports = route;
