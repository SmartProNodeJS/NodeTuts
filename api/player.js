const express = require('express');
//const Promise = require('promise');
const route = express.Router();

route.get("/all", function(req, res) {
  const db = req.db;
  const playerCollection = db.get("players");
  //const teamCollection = db.get("teams");

  playerCollection.find({}, {}, function(err, players) {
    if (err) {
      console.log(" Error: " + JSON.stringify(err));
    } else {
      /*const freePlayers = [];
      const findPlayerInTeams = function(player) {
        return new Promise(function(resolve, reject) {
          teamCollection.find({ 'players._id': { $eq: player._id } }, {}, function(err, teams) {
            if (err) {
              reject();
            } else if (teams.length > 0) {
              resolve(player._id.toString());
            } else {
              resolve(null);
            }
          });
        });
      };

      Promise.all(players.map(findPlayerInTeams)).then(function(_ids) {
        for (let i = 0; i < players.length; i++) {
          if (_ids.indexOf(players[i]._id.toString()) < 0) {
            freePlayers.push(players[i]);
          }
        }

        res.json(freePlayers);
      });*/

      res.json(players);
    }
  });
});

module.exports = route;