var Promise = require('promise');
var Monk = require('monk');
var DbConfig = require('../config');

function findAll() {
  return new Promise(function(resolve, reject){
    Monk(DbConfig.db_url, function(err, dbConn){
      if(err){
        reject(err);
      }else{
        var sports = dbConn.get('sports');
        sports.find({},{}, function(err, sport_list){
          if(err) reject(err);
          else resolve(sport_list);
        });
        dbConn.close();
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
        var sports = dbConn.get('sports');
        sports.find({"name":name},{}, function(err, sport_list){
          if(err) reject(err);
          else resolve(sport_list);
        });
        dbConn.close();
      }
    });
  });
}

module.exports = {
                   findAll:findAll,
                   findByName: findByName
                 };