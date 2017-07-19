const express = require('express');
const route = express.Router();

route.get("/", function(req, res) {
  const menu_items = req.menu_items;

  menu_items.forEach(function(it) {
    it.active = (it.name === 'league') ? "active" : "";
  });

  const db = req.db;
  const leagueCollection = db.get("leagues");

  leagueCollection.find({}, {}, function(err, leagues) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    } else {
      res.render('leagues', { "page_title": "Leagues", "leagues": leagues, "menu_items": menu_items });
    }
  });
});

module.exports = route;