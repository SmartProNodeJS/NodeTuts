var http = require("http");
var httpServer = http.createServer( function(request, response) {
    response.statusCode = 2001;
    response.setHeader("Content-Type", "text/html");
    response.end("<html><title>Hello</title><body><h1>Hello, World</h1></body></html>");
}).listen(8080, function(){
    console.log("Server is listening on port 8080");
});