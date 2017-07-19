const path = require("path");
const express = require('express');
const bodyParser = require("body-parser");
const Monk = require('monk');
const config = require('./config');
const menu_items = require('./models/main_menu');
const Sports = require('./models/sports');
const playerRoute = require('./routes/player.js');
const teamRoute = require('./routes/team.js');
const leagueRoute = require('./routes/league.js');
const teamAPI = require('./api/team.js');
const leagueAPI = require('./api/league.js');
const sportAPI = require('./api/sport.js');
const playerAPI = require('./api/player.js');

const app = express();

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

const db = Monk(config.db_url, function(err, db) {
  if (err) {
    console.log("Could not connect to database: " + db_url);
    process.exit(0);
  }
});

app.use(function(request, res, next) {
  if (!request.db)
    request.db = db;

  if (!request.menu_items)
    request.menu_items = menu_items;

  next();
});
app.use(express.static("public/"));
app.use("/player", playerRoute);
app.use("/team", teamRoute);
app.use("/league", leagueRoute);
app.use("/api/team", teamAPI);
app.use("/api/league", leagueAPI);
app.use("/api/sport", sportAPI);
app.use("/api/player", playerAPI);

const urlencodedParser = bodyParser.urlencoded({ extended: false });

app.get('/', urlencodedParser, function(req, res) {
  menu_items.forEach(function(it) {
    it.active = (it.name == 'home') ? "active" : "";
  });
  res.render("index", { "menu_items": menu_items });
});

app.get('/sports', function(req, res) {
  Sports.findAll().then(function(sports) {
    res.status(200).json(sports);
  }).catch(function(err) {
    console.log("Error: " + err);
  });
});

app.get('/sport/:name', function(req, res) {
  Sports.findByName(req.params.name).then(function(sports) {
    res.status(200).json(sports[0]);
  }).catch(function(err) {
    console.log("Error: " + err);
  });
});

app.post('/sport', urlencodedParser, function(req, res) {
  Sports.findByName(req.body.sport_name).then(function(sports) {
    console.log("Sports with name(" + req.body.sport_name + "): " + JSON.stringify(sports));
    res.status(200).json(sports[0]);
  }).catch(function(err) {
    console.log("Error: " + err);
  });
});

const handle404Pages = function handle404(req, res, next) {
  menu_items.forEach(function(it) {
    it.active = (it.name == 'home') ? "active" : "";
  });
  res.status(404);
  // respond with html page
  if (req.accepts('html')) {
    res.render('404', { "menu_items": menu_items, url: req.url });
    return;
  }

  // respond with json
  if (req.accepts('json')) {
    res.send({ error: 'Not found' });
    return;
  }
  // default to plain-text. send()
  res.type('txt').send('Not found');
}
app.use(handle404Pages);

var server = app.listen(8081, function() {
  var host = server.address().address,
    port = server.address().port;
  console.log("Example app listening at http://%s:%s", host, port);
})

module.exports = app;