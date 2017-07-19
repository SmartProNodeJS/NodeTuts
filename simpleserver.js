const http = require("http");
var decode = require('urldecode');

var httpServer = http.createServer(function (request, response) {
    var method = request.method,
        url = request.url;
    console.log("Method: "+method+"\nURL: "+url);
    var url_arr = url.split("?");
    // Abc
    if("/hello"==url_arr[0]){
        response.statusCode = 200;
        response.setHeader("Content-Type", "text/html;charset=utf-8");
        response.write("<html><title>Hello</title><body><h1>Hello, "+decode(url_arr[1].split("=")[1])+"</h1></body></html>");
        response.endd();
    }else{
        response.statusCode = 404;
        response.end();
    }
}).listen(8080, function() {
    console.log("Server is listening on port 8080");
});
