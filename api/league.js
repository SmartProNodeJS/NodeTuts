const express = require('express');
const bodyParser = require("body-parser");
const route = express.Router();

route.delete('/:id', function(req, res) {
  var db = req.db;
  var leagueCollection = db.get("leagues");

  leagueCollection.remove({ "_id": req.params.id }, function(err, leagues) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    } else {
      res.json({ status: true });
    }
  });
});

route.get("/all", function(req, res) {
  const db = req.db;
  const leagueCollection = db.get("leagues");

  leagueCollection.find({}, {}, function(err, leagues) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    } else {
      res.json(leagues);
    }
  });
});

const urlencodedParser = bodyParser.urlencoded({ extended: false });

route.post('/', urlencodedParser, function(req, res) {
  const db = req.db;
  const league = {};
  const _id = req.body._id;

  league.name = req.body.name;
  league.organiser = req.body.organiser;
  league.date_start = req.body.date_start;
  league.date_end = req.body.date_end;
  league.sponsors = JSON.parse(req.body.sponsors);

  const leagueCollection = db.get("leagues");

  if (_id === '0') {
    leagueCollection.insert(league, {}, function(err, added_league) {
      if (err) {
        console.log(" Error: " + JSON.stringify(err));
      } else {
        res.json({ 'status': true });
      }
    });
  } else {
    leagueCollection.update({ "_id": _id }, league, { upsert: true }, function(err, added_league) {
      if (err) {
        console.log(" Error: " + JSON.stringify(err));
      } else {
        res.json({ 'status': true });
      }
    });
  }
});

module.exports = route;