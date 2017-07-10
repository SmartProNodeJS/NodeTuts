var WebSocketServer = require('websocket').server;
var httpServer = require('http');
var fs = require('fs');

var httpServerHandler = function(req, res) {
   console.log("HTTP server handler....");
   var clientPage = fs.readFileSync('./public/html/websocket_client.html');
   res.writeHead(200, { 'Content-Type': 'text/html'});
   res.end(clientPage, 'utf-8');
}

var http = httpServer.createServer(httpServerHandler);
http.listen(8080, function(){
  console.log("Server HTTP started and listening on port 8080");
});

var wsSocket = new WebSocketServer({httpServer: http});

wsSocket.on('request', function(req){
  var connection = req.accept(null, req.origin);
  console.log('Connection is established...');
  //Send message to connection
  connection.sendUTF(JSON.stringify({"type":"welcome","text":"Welcome to WebSocket"}));
  connection.on('message', function(message){
      console.log("Message from client..."+message.utf8Data);
  });

  connection.on('close', function(conn){
     console.log('Connection closed.');
  });
});