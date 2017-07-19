var express = require('express');
var route = express.Router();
var bodyParser = require("body-parser");
var menu_items = require('../models/main_menu');
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

route.use(function(req, res, next){
  menu_items.forEach(function(it){
    console.log(it.name+" is "+it.active);
    it.active = (it.name=='league')?"active":"";

  });
  next();
});
///////////////////////////////////////////////////
//list leagues
route.get('/', function (req, res){
    var db = req.db;
    var userCol = db.get("leagues");
    userCol.find({},{}, function(err, leagues){
      if(err) {
          console.log(" Error: "+JSON.stringify(err));
      }else{
        res.render('leagues',{"page_title":"List Leagues","leagues":leagues,"menu_items":menu_items});
      }
    });
});
//add or edit league
route.get('/:id', function (req, res){
    var id;
    id = String(req.params.id);
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");
    console.log('id = ' + id);
    var db = req.db;
    var lgCol = db.get("leagues");
    //var sportCol = db.get("sports");
    if(idCheck.test(id)){
        lgCol.find({"_id":id},{}, function(err, league){
            if(err) {
                console.log(" Error: "+JSON.stringify(err));
            }else{
                console.log(" League name : "+ league[0].name);
                res.render('league',{"page_title":"Edit League","league":league[0],"menu_items":menu_items});
                /*sportCol.find({},{}, function(err, sport_list){
                    res.render('league',{"page_title":"Edit League","league":league[0],"sport_list":sport_list,"menu_items":menu_items});
                    res.end();
                });*/
            }
        });
    }
    else{
        res.render('league',{"page_title":"Add League","league":{},"menu_items":menu_items});
        /*sportCol.find({},{}, function(err, sport_list){
            res.render('league',{"page_title":"Add League","league":{},"menu_items":menu_items});
            res.end();
        });*/
    }
});
//save league
route.post('/',urlencodedParser, function (req, res) {
    var id, league = {};
    id = String(req.body.obj_id);
    var idCheck = new RegExp("^[0-9a-fA-F]{24}$");
    league.name = req.body.name;
    league.start = req.body.start;
    league.end = req.body.end;
    league.place = req.body.place;
    league.sponsors = req.body.sponsors;
    league.organiser = req.body.organiser;
    var db = req.db;
    var leagues = db.get("leagues");
    if(idCheck.test(id)){
        leagues.update({'_id':id}, league, function(err, added_league){
        if(err) {
            console.log(" Error: "+JSON.stringify(err));
        }else{
            res.redirect("/league/")
        }
        });
    }else{
        leagues.insert(league, function(err, added_league){
        if(err) {
            console.log(" Error: "+JSON.stringify(err));
        }else{
            res.redirect("/league/")
        }
        });
    }
});
route.delete('/:id',function (req, res){
    var result = {"status":false,"msgText":"League not found."};
    var id;
    id = req.params.id;
    console.log("League id: " + id);            
    var db = req.db;
    var leagues = db.get("leagues");
    leagues.remove({'_id':id}, function(err){
      if(err) {
            console.log(" Error: "+JSON.stringify(err));
      }else{
            result.status = true;
            result.msgText = 'Delete success league';
            console.log("Success Delete: "+JSON.stringify(result));
            res.json(result);
      }
    });
    
});
///////////////////////////////////////////////////
module.exports = route;
