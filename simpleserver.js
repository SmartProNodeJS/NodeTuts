var http = require("http");
var httpServer = http.createServer( function(request, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
<<<<<<< HEAD
    response.end("<html><title>Hello</title><body><h1>Hello, World</h1></body></html>");
=======
<<<<<<< HEAD
    response.end("<html><title>Hello phtan</title><body><h1>Hello, World</h1></body></html>");
>>>>>>> lehien
}).listen(8080, function(){
    console.log("Server is listening on port 8080");
});