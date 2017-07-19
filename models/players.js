var Promise = require('promise');
var Monk = require('monk');
var DbConfig = require('../config');
var players = [{"first_name":"volleyball","last_name":"Bong chuyen"},
{"first_name":"swimming","last_name":"Boi/Loi"},{"first_name":"table_tennis"
,"last_name":"Bong ban"},{"first_name":"Football","last_name":"Bong da"}]
function init(){
  Monk(DbConfig.db_url, function(err, dbConn){
        var players = dbConn.get('players');
        players.deleteMany({}, function(err, results){
          console.log("players is now empty.");
          players.insert(players, function(err, added){
            console.log("players is now inserted.");
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
        players.find({},{}, function(err, sport_list){
          if(err) reject("Could not find sport: "+err);
          else resolve(sport_list);
           dbConn.close();
        });
       
      }
    });
  });
}

function findByfirst_name(first_name) {
  return new Promise(function(resolve, reject){
    Monk(DbConfig.db_url, function(err, dbConn){
      if(err){
        reject(err);
      }else{
        var players = dbConn.get('players');
        players.find({"first_name":first_name},{}, function(err, sport_list){
          if(err) reject(err);
          else resolve(sport_list);
          dbConn.close();
        });
        
      }
    });
  });
}

module.exports = {
                   findAll:findAll,
                   findByfirst_name: findByfirst_name
                 };