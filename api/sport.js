const express = require('express');
const route = express.Router();

route.get("/all", function(req, res) {
  const db = req.db;
  const sportCollection = db.get("sports");

  sportCollection.find({}, {}, function(err, sports) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    } else {
      res.json(sports);
    }
  });
});

module.exports = route;