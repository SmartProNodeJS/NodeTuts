var express = require('express');
var route = express.Router();
var bodyParser = require("body-parser");
var menu_items = require('../models/main_menu');

// Create application/x-www-form-urlencoded parser

var urlencodedParser = bodyParser.urlencoded({ extended: false });
route.get("/", function(req, res) {
    var db = req.db;
    var LeagueCol = db.get("leagues");
    LeagueCol.find({},{}, function(err, leagues){
      if(err) {
      }else{
            var userCol2 = db.get("players");
            userCol2.find({},{}, function(err, players){
            if(err) {
            }else{
                var userCol3 = db.get("teams");
                userCol3.find({},{}, function(err, teams){
                if(err) {
                }else{
                    res.render('home',{"page_title":"Teams -Player-League","teams":teams,"players":players,"leagues":leagues,"menu_items":menu_items});
                }
                });   
            }
            });   
      }
    });   
});
module.exports = route;