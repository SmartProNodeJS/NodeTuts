var WebSocketServer = require('websocket').server;
var httpServer = require('http');
var fs = require('fs');


var httpServerHandler = function(req,res){
    console.log("Http server  handler...");
    var clientPage = fs.readFileSync('websocket_client.html');
    res.writeHead(200, {'Content-Type':'text/html'});
    res.end(clientPage,'utf-8');
}


var http = httpServer.createServer(httpServerHandler);
http.listen(8080,function(){
    console.log("server http start and listening 8080 ");
});

//lam websocket 
var wsSocket = new WebSocketServer({httpServer:http});




//client keep connection
wsSocket.on('request',function(req){
    var connection = req.accept(null, req.orgin);
    console.log("Connnection is establish");
    connection.sendUTF(JSON.stringify({"type":"welcome", "text":"Welcome to Socket"}));
    
    //connection tu dau toi 
    connection.on('message',function(message){
        console.log("Message from client..."+ message.utf8Data);
    });

    //Khi connection close
    connection.on('close',function(conn){
        console.log('Connection Close.');
    });
});