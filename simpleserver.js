const http = require("http");
const decode = require('urldecode');

var httpServer = http.createServer(function (req, res) {
    var method = req.method;
    var url = req.url;
    var name = req.aido;
    var url_array = url.split('?');

    console.log('METHOD: ' + method + ', URL: ' + url);

    if (url_array[0] === '/hello') {
        res.statusCode = 200;
        res.setHeader("Content-Type", "text/html");
        res.write("<html><title>Hello</title><body><h1>Hello, " + decode(url_array[1].split('=')[1]) + "</h1></body></html>");
    }
    else {
        res.statusCode = 404;
    }

    res.end();
}).listen(8080, function () {
    console.log("Server is listening on port 8080");
});
