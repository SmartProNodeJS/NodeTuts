const express = require('express');
const route = express.Router();
const bodyParser = require('body-parser');
const urlencodedParser = bodyParser.urlencoded({ extended: false });
let menu_items;

route.use(function (req, res, next) {
  menu_items = req.menu_items;

  menu_items.forEach(function (it) {
    it.active = (it.name === 'team') ? "active" : "";
  });

  next();
});

route.get("/", function (req, res) {
  let db = req.db;
  let teamCollection = db.get("teams");

  teamCollection.find({}, {}, function (err, teams) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    }
    else {
      res.render('team', { "page_title": "Teams", "teams": teams, "menu_items": menu_items });
    }
  });
});

route.get('/:id', function (req, res) {
  var db = req.db;
  var teams = db.get("teams");
  var id = String(req.params.id);
  var idCheck = new RegExp("^[0-9a-fA-F]{24}$");

  if (idCheck.test(id)) {
    teams.find({ "_id": id }, {}, function (err, teams) {
      if (err) {
        console.log(JSON.stringify(err));
      }
      else {
        res.json(teams[0]);
        res.end();
      }
    });
  }
});

route.post('/', urlencodedParser, function (req, res) {
  var db = req.db;
  var team = {};
  var team_id = req.body.team_id;

  team.team_name = req.body.team_name;
  team.players = req.body.players;

  db.get('teams').upsert({ "_id": team_id }, {}, function (err, teams) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    }
    else {
      res.json({ ok: 1 });
    }
  });

});

route.delete('/:id', function (req, res) {
  var db = req.db;
  var userCol = db.get("players");
  userCol.remove({ "_id": req.params.id }, function (err, users) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    } else {
      res.json({ status: true });
    }
  });
});

module.exports = route;