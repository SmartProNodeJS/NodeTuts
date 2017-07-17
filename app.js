const path = require("path");
var express = require('express');
var http = require('http');
var bodyParser = require("body-parser");
var cookies = require("cookie-parser");
var socketio = require("socket.io");
var Session = require('express-session');
var Monk = require('monk');
var SocketIO = require("socket.io");
var config = require('./config');
var menu_items = require('./models/main_menu');
var io = socketio(ioHttp);
var db = Monk(config.db_url, function(err, db){
    if(err){
        console.log("Could not connect to database: "+db_url);
        process.exit(0);
    }
});
var app = express();
app.use(Session({secret:"NodeJSSecret"}));
// Middle ware to put db object to request
app.use(function(request, res, next){
  if(!request.db)
    request.db = db;
  next();
});
var playerRoute = require('./routes/player.js');
app.use("/player", playerRoute);
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("public/"));
app.use(cookies());
app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug"); 

app.get('/', urlencodedParser, function (req, res) {
    menu_items.forEach(function(it){
        console.log(it.name+" is "+it.active);
        it.active = (it.name=='home')?"active":"";
    });
    res.render("index",{"menu_items":menu_items});
});

var Sports = require('./models/sports');

Sports.findAll().then(function(sports){
    console.log("Sports: "+JSON.stringify(sports));
}).catch(function(err){
    console.log("Error: "+err);
});

Sports.findByName("Football").then(function(sports){
    console.log("Sports with name (Football): "+JSON.stringify(sports));
}).catch(function(err){
    console.log("Error: "+err);
}); 

var ioHttp = http.Server(app);

var sockets = [];

var io = SocketIO(ioHttp);

io.on("connection", function(socket){
    console.log("A client has just been connected");
    socket.send("A message send from server at "+new Date());
    socket.on('disconnection', function (socket) {
        console.log("A client has just been disconnected");
    });
    socket.on('logged_user', function(user_name){
        sockets.forEach(function(s){
            if(socket == s.socket){
              s.user = user_name;
            };
            console.log("User logged: "+s.user);
        });
    });
    socket.on('chat_msg', function(msg) {
        sockets.forEach(function(s){
            if(msg.to == s.user){
               s.socket.send(msg.message);
            }          
        });
    });

    sockets.push({"user":"", "socket":socket});
});

var server = ioHttp.listen(8081, function () {
    var host = server.address().address,
    port = server.address().port;
    console.log("Example app listening at http://%s:%s", host, port);
})