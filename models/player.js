var Promise = require('promise');
var Monk = require('monk');
var DbConfig = require('../config');
var players = []
function init(){
  Monk(DbConfig.db_url, function(err, dbConn){
        var players = dbConn.get('players');
        players.deleteMany({}, function(err, results){
          console.log("Players is now empty.");
          players.insert(sports, function(err, added){
            console.log("Players is now inserted.");
          });
        });
  });
}

function findAll() {
  console.log("Db URL: "+DbConfig.db_url);
  return new Promise(function(resolve, reject){
    Monk(DbConfig.db_url, function(err, dbConn){
      if(err){
        reject("Could not connect to database: "+err);
      }else{
        var players = dbConn.get('players');
        players.find({},{}, function(err, players){
          if(err) reject("Could not find sport: "+err);
          else resolve(players);
           dbConn.close();
        });
       
      }
    });
  });
}

function findBySportName(sport_name) {
  return new Promise(function(resolve, reject){
    Monk(DbConfig.db_url, function(err, dbConn){
      if(err){
        reject(err);
      }else{
        var players = dbConn.get('players');
        players.find({"sport_name":sport_name},{}, function(err, players){
          if(err) reject(err);
          else resolve(players);
          dbConn.close();
        });
        
      }
    });
  });
}
function findByPlayerId(id) {
  return new Promise(function(resolve, reject){
    Monk(DbConfig.db_url, function(err, dbConn){
      if(err){
        reject(err);
      }else{
        var players = dbConn.get('players');
        players.find({"_id":id},{}, function(err, sport_list){
          if(err) reject(err);
          else resolve(players);
          dbConn.close();
        });
        
      }
    });
  });
}
module.exports = {
                   findAll:findAll,
                   findBySportName: findBySportName
                 };