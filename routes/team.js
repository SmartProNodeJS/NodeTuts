const express = require('express');
const route = express.Router();

route.get("/", function(req, res) {
  const menu_items = req.menu_items;

  menu_items.forEach(function(it) {
    it.active = (it.name === 'team') ? "active" : "";
  });

  const db = req.db;
  const teamCollection = db.get("teams");

  teamCollection.find({}, {}, function(err, teams) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    } else {
      res.render('teams', { "page_title": "Teams", "teams": teams, "menu_items": menu_items });
    }
  });
});

module.exports = route;