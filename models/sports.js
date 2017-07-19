var Promise = require('promise');
var Monk = require('monk');
var DbConfig = require('../config');
var sports = [{ "name": "volleyball", "desc": "Bong chuyen" },
{ "name": "swimming", "desc": "Boi/Loi" }, {
  "name": "table_tennis"
  , "desc": "Bong ban"
}, { "name": "Football", "desc": "Bong da" }]

var Sexs = [{ "name": "1", "desc": "Male" },
{ "name": "2", "desc": "Female" }]

function init() {
  Monk(DbConfig.db_url, function (err, dbConn) {
    var sports = dbConn.get('sports');
    sports.deleteMany({}, function (err, results) {
      console.log("Sports is now empty.");
      sports.insert(sports, function (err, added) {
        console.log("Sports is now inserted.");
      });
    });
  });
  Monk(DbConfig.db_url, function (err, dbConn) {
    var Sexs = dbConn.get('Sexs');
    Sexs.deleteMany({}, function (err, results) {
      console.log("Sexs is now empty.");
      Sexs.insert(Sexs, function (err, added) {
        console.log("Sexs is now inserted.");
      });
    });
  });
}

function findAll() {
  console.log("Db URL: " + DbConfig.db_url);
  return new Promise(function (resolve, reject) {
    Monk(DbConfig.db_url, function (err, dbConn) {
      if (err) {
        reject("Could not connect to database: " + err);
      } else {
        var sports = dbConn.get('sports');
        sports.find({}, {}, function (err, sport_list) {
          if (err) reject("Could not find sport: " + err);
          else resolve(sport_list);
          dbConn.close();
        });

      }
    });
  });
}

function findByName(name) {
  return new Promise(function (resolve, reject) {
    Monk(DbConfig.db_url, function (err, dbConn) {
      if (err) {
        reject(err);
      } else {
        var sports = dbConn.get('sports');
        sports.find({ "name": name }, {}, function (err, sport_list) {
          if (err) reject(err);
          else resolve(sport_list);
          dbConn.close();
        });

      }
    });
  });
}


function findAll_Sexs() {
  console.log("Db URL: " + DbConfig.db_url);
  return new Promise(function (resolve, reject) {
    Monk(DbConfig.db_url, function (err, dbConn) {
      if (err) {
        reject("Could not connect to database: " + err);
      } else {
        var Sexs = dbConn.get('Sexs');
        Sexs.find({}, {}, function (err, sex_list) {
          if (err) reject("Could not find sport: " + err);
          else resolve(sex_list);
          dbConn.close();
        });

      }
    });
  });
}

function findByName_Sexs(name) {
  return new Promise(function (resolve, reject) {
    Monk(DbConfig.db_url, function (err, dbConn) {
      if (err) {
        reject(err);
      } else {
        var Sexs = dbConn.get('Sexs');
        Sexs.find({ "name": name }, {}, function (err, sex_list) {
          if (err) reject(err);
          else resolve(sex_list);
          dbConn.close();
        });
      }
    });
  });
}

module.exports = {
  findAll: findAll,
  findByName: findByName,
  findAll_Sexs:findAll_Sexs,
  findByName_Sexs:findByName_Sexs
};