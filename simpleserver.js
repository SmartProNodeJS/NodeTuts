var http = require("http");
var httpServer = http.createServer( function(request, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
    response.end("<html><title>Hello</title><body><h1>Hello, World</h1></body></html>");
}).listen(8080, function(){
<<<<<<< HEAD
    console.log("Server is listening on port 8080");
});aa
=======
    console.log("Server 1 cdvjkeshdgoherotghr3ouiehogiuhrelgsfugiuhsfug is listening on port 8080");
});
>>>>>>> 4908da98a6bdc673b06e166ebf0aded4b7bb125d
