const express = require('express');
const bodyParser = require("body-parser");
const route = express.Router();

route.delete('/:id', function(req, res) {
  var db = req.db;
  var teamCollection = db.get("teams");

  teamCollection.remove({ "_id": req.params.id }, function(err, teams) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    } else {
      res.json({ status: true });
    }
  });
});

route.get("/all", function(req, res) {
  const db = req.db;
  const teamCollection = db.get("teams");

  teamCollection.find({}, {}, function(err, teams) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    } else {
      res.json(teams);
    }
  });
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });

route.post('/', urlencodedParser, function(req, res) {
  const db = req.db;
  const team = {};
  const _id = req.body._id;

  team.team_name = req.body.team_name;
  team.sport_desc = req.body.sport_desc;
  team.sport_name = req.body.sport_name;
  team.players = JSON.parse(req.body.players);

  const teamCollection = db.get("teams");

  if (_id === '0') {
    teamCollection.insert(team, {}, function(err, added_team) {
      if (err) {
        console.log(" Error: " + JSON.stringify(err));
      } else {
        res.json({ 'status': true });
      }
    });
  } else {
    teamCollection.update({ "_id": _id }, team, { upsert: true }, function(err, added_team) {
      if (err) {
        console.log(" Error: " + JSON.stringify(err));
      } else {
        res.json({ 'status': true });
      }
    });
  }
});

module.exports = route;