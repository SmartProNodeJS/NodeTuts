const path = require("path");
var express = require('express');
var http = require('http');
var bodyParser = require("body-parser");
var Monk = require('monk');
var config = require('./config');
var menu_items = require('./models/main_menu');
var db = Monk(config.db_url, function (err, db) {
    if (err) {
        console.log("Could not connect to database: " + db_url);
        process.exit(0);
    }
});
var app = express();
var Sports = require('./models/sports');

// Middle ware to put db object to request
app.use(function (request, res, next) {
    if (!request.db)
        request.db = db;

    if (!request.menu_items)
        request.menu_items = menu_items;

    next();
});

var playerRoute = require('./routes/player.js');
app.use("/player", playerRoute);

var teamRoute = require('./routes/team.js');
app.use("/team", teamRoute);

// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(express.static("public/"));
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.get('/', urlencodedParser, function (req, res) {
    menu_items.forEach(function (it) {
        console.log(it.name + " is " + it.active);
        it.active = (it.name == 'home') ? "active" : "";
    });
    res.render("index", { "menu_items": menu_items });
});

app.get('/sports', function (req, res) {
    Sports.findAll().then(function (sports) {
        //console.log("Sports: "+JSON.stringify(sports));
        res.status(200).json(sports);
    }).catch(function (err) {
        console.log("Error: " + err);
    });
});

app.get('/sport/:name', function (req, res) {
    Sports.findByName(req.params.name).then(function (sports) {
        console.log("Sports with name (Football): " + JSON.stringify(sports));
        res.status(200).json(sports[0]);
    }).catch(function (err) {
        console.log("Error: " + err);
    });
});

app.post('/sport', urlencodedParser, function (req, res) {
    Sports.findByName(req.body.sport_name).then(function (sports) {
        console.log("Sports with name(" + req.body.sport_name + "): " + JSON.stringify(sports));
        res.status(200).json(sports[0]);
    }).catch(function (err) {
        console.log("Error: " + err);
    });
});

var handle404Pages = function handle404(req, res, next) {
    console.log("Response Type: " + req.accepts('html'));
    menu_items.forEach(function (it) {
        console.log(it.name + " is " + it.active);
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

var server = app.listen(8081, function () {
    var host = server.address().address,
        port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})

module.exports = app;