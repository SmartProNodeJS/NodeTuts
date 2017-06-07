const http = require("http");

var httpServer = http.createServer(function (request, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.write("<html><title>Hello</title><body><h1>Hello, World</h1></body></html>");
    response.end();
}).listen(3128, function() {
    console.log("Server is listening on port 3128");
});
