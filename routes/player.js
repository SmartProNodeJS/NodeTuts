const express = require('express');
const bodyParser = require("body-parser");
const menu_items = require('../models/main_menu');
const ObjectID = require('mongodb').ObjectID;
const route = express.Router();

route.use(function(req, res, next) {
  menu_items.forEach(function(it) {
    it.active = (it.name === 'player') ? "active" : "";
  });

  next();
});

route.get("/", function(req, res) {
  const db = req.db;
  const playerCollection = db.get("players");

  playerCollection.find({}, {}, function(err, players) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    } else {
      res.render('players', { "page_title": "Players", "players": players, "menu_items": menu_items });
    }
  });
});

route.get('/:id', function(req, res) {
  const db = req.db;
  const playerCollection = db.get("players");
  const sports = db.get("sports");
  const id = String(req.params.id);
  const idCheck = new RegExp("^[0-9a-fA-F]{24}$");

  if (idCheck.test(id)) {
    playerCollection.find({ "_id": id }, {}, function(err, players) {
      var sportcb = function(err, sport_list) {
        res.render('player', { "btn_caption": "Update", "page_title": "Edit Player", "sport_list": sport_list, "player": players[0], "menu_items": menu_items });
        res.end();
      }
      if (err) {
        console.log(JSON.stringify(err));
      } else {
        sports.find({}, {}, sportcb);
      }
    });
  } else {
    var newplayer = { "_id": new ObjectID(), "first_name": "", "last_name": "", age: "", "sport_name": "" }
    sports.find({}, {}, function(err, sport_list) {
      res.render('player', { "btn_caption": "Add new", "page_title": "Add New Player", "sport_list": sport_list, "player": newplayer, "menu_items": menu_items });
      res.end();
    });
  }
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });

route.post('/', urlencodedParser, function(req, res) {
  console.log("Request.body = " + JSON.stringify(req.body));
  var db = req.db;
  var user = {};
  var obj_id = req.body.obj_id;
  user.first_name = req.body.first_name;
  user.last_name = req.body.last_name;
  user.age = req.body.age;
  db.get('sports').find({ "name": req.body.sport_name }, {}, function(err, s) {
    user.sport = s[0];
    var users = db.get("players");
    users.update({ "_id": obj_id }, user, { upsert: true }, function(err, added_user) {
      if (err) {
        console.log(" Error: " + JSON.stringify(err));
      } else {
        res.redirect("/player/")
      }
    });
  });

});

route.delete('/:id', function(req, res) {
  var db = req.db;
  var userCol = db.get("players");
  userCol.remove({ "_id": req.params.id }, function(err, users) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    } else {
      res.json({ status: true });
    }
  });
});

module.exports = route;