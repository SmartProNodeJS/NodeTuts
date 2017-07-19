var Promise = require('promise');
var Monk = require('monk');
var DbConfig = require('../config');
var teams =  {};
function init(){
  Monk(DbConfig.db_url, function(err, dbConn){
        var teams = dbConn.get('team');
        teams.deleteMany({}, function(err, results){
          console.log("Teams is now empty.");
          sports.insert(teams, function(err, added){
            console.log("Teams is now inserted.");
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
        var sports = dbConn.get('sports');
        sports.find({},{}, function(err, sport_list){
          if(err) reject("Could not find sport: "+err);
          else resolve(sport_list);
           dbConn.close();
        });
       
      }
    });
  });
}

function findByName(name) {
  return new Promise(function(resolve, reject){
    Monk(DbConfig.db_url, function(err, dbConn){
      if(err){
        reject(err);
      }else{
        var teams = dbConn.get('team');
        teams.find({"name":name},{}, function(err, sport_list){
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
                   findByName: findByName
                 };