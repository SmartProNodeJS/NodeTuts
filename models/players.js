var Promise = require('promise');
var Monk = require('monk');
var DbConfig = require('../config');

function findAll() {
  console.log("Db URL: "+DbConfig.db_url);
  return new Promise(function(resolve, reject){
    Monk(DbConfig.db_url, function(err, dbConn){
      if(err){
        reject("Could not connect to database: "+err);
      }else{
        var players = dbConn.get('players');
        players.find({},{}, function(err, player_list){
          if(err) reject("Could not find player: "+err);
          else resolve(player_list);
           dbConn.close();
        });
       
      }
    });
  });
}

function findById(id) {
  return new Promise(function(resolve, reject){
    Monk(DbConfig.db_url, function(err, dbConn){
      if(err){
        reject(err);
      }else{
        var teams = dbConn.get('teams');
        teams.find({"_id":id},{}, function(err, player_list){
          if(err) reject(err);
          else resolve(player_list);
          dbConn.close();
        });
        
      }
    });
  });
}

function findBySportName(name) {
  return new Promise(function(resolve, reject){
    Monk(DbConfig.db_url, function(err, dbConn){
      if(err){
        reject(err);
      }else{
        var teams = dbConn.get('teams');
        teams.find({"sport.name":name},{}, function(err, player_list){
          if(err) reject(err);
          else resolve(player_list);
          dbConn.close();
        });
        
      }
    });
  });
}

module.exports = {
                   findAll:findAll,
                   findById: findById,
                   findBySportName: findBySportName,
                 };