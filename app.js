const path = require("path");
var express = require('express');
var http = require('http');
var bodyParser = require("body-parser");
var cookies = require("cookie-parser");
<<<<<<< HEAD
<<<<<<< HEAD
var esession = require("express-session");
var mongo = require('mongodb');
var db = require('monk')('localhost:27017/lm');
var user_list = [];


var socketio = require("socket.io");

var io = socketio(ioHttp);
var ioHttp = http.Server(app);

io.on('connection', function(socket){
  console.log("A client has been connected");

  //Whenever someone disconnects this piece of code executed
  socket.on('disconnect', function () {
    console.log("A client has been connected");
  });

});


=======
=======
>>>>>>> 2b7f8dec1c36932af0cf480208d809f59da63374
var Session = require('express-session');
var Monk = require('monk');
var SocketIO = require("socket.io");
var config = require('./config');
var menu_items = require('./models/main_menu');

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

var ioHttp = http.Server(app);
<<<<<<< HEAD
>>>>>>> 2b7f8dec1c36932af0cf480208d809f59da63374
=======
>>>>>>> 2b7f8dec1c36932af0cf480208d809f59da63374
// Create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(express.static("public/"));
app.use(cookies());
app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug"); 

<<<<<<< HEAD
<<<<<<< HEAD
app.get('/', urlencodedParser, function (req, res) {
    res.cookie("router_root","/",{expires: new Date(360000+ Date.now())});
    res.render("index",{username:req.query.un});
});



app.get('/lm', function (req, res) {
    var statistical_name= req.query.s_name, statistical_value=req.query.s_value; 
    // if(Leagues_name==undefined)
    //   Leagues_name = req.params.f_n+"("+req.params.age+")";
    // if(last_name==undefined)
    //   last_name = req.params.l_n;
    var statistical_list = [];
        statistical_list.push({"name":"Football","desc":"Quoc gia vo dich nhieu nhat"});
        statistical_list.push({"name":"volleyball","desc":"Bong chuyen"});
        statistical_list.push({"name":"table_tennis","desc":"Bong ban"});
        statistical_list.push({"name":"swimming","desc":"Boi/Loi"});
        statistical_list.push({"name":statistical_name,"desc":statistical_value});
    res.render('lm',{"page_title":"Register Leagues","statistical_list":statistical_list});
}); 



app.get('/reg', function (req, res) {
    var last_name= req.query.l_name, first_name=req.query.f_name;
    if(first_name==undefined)
      first_name = req.params.f_n+"("+req.params.age+")";
    if(last_name==undefined)
      last_name = req.params.l_n;
    var sport_list = [];
        sport_list.push({"name":"Football","desc":"Bong da"});
        sport_list.push({"name":"volleyball","desc":"Bong chuyen"});
        sport_list.push({"name":"table_tennis","desc":"Bong ban"});
        sport_list.push({"name":"swimming","desc":"Boi/Loi"});
        sport_list.push({"name":last_name,"desc":first_name});
    res.render('register',{"page_title":"Register User","sport_list":sport_list});
=======
=======
>>>>>>> 2b7f8dec1c36932af0cf480208d809f59da63374
app.get('/', urlencodedParser, function (request, res) {
  menu_items.forEach(function(it){
    console.log(it.name+" is "+it.active);
    it.active = (it.name=='home')?"active":"";
  });
    res.render("index",{"menu_items":menu_items});
<<<<<<< HEAD
>>>>>>> 2b7f8dec1c36932af0cf480208d809f59da63374
=======
>>>>>>> 2b7f8dec1c36932af0cf480208d809f59da63374
}); 
app.use("/player",playerRoute);
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
    port = server.address().port
console.log("Example app listening at http://%s:%s", host, port)
});