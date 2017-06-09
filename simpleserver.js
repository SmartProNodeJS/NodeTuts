const http = require("http");

var httpServer = http.createServer(function (request, response) {
    response.statusCode = 200;
    response.setHeader("Content-Type", "text/html");
<<<<<<< HEAD
    response.end("<html><title>Hello</title><body><h1>Hello, World</h1></body></html>");
}).listen(8080, function(){
    console.log("Server is listening on port 8080");
<<<<<<< HEAD
});
=======
<<<<<<< HEAD
});gggggggggggggggggggggggg
=======
});aa
>>>>>>> b2ec19f551e3d2a2e08031534c68ece7c13b26b3
=======
    console.log("Server 1 cdvjkeshdgoherotghr3ouiehogiuhrelgsfugiuhsfug is listening on port 8080");
});
>>>>>>> 4908da98a6bdc673b06e166ebf0aded4b7bb125d
<<<<<<< HEAD
ggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggggg
=======
>>>>>>> b2ec19f551e3d2a2e08031534c68ece7c13b26b3
>>>>>>> 7d6c16552c1243b5c9b0098803d42eb0760c667e
=======
    response.write("<html><title>Hello</title><body><h1>Hello, World</h1></body></html>");
    response.end();
}).listen(3128, function() {
    console.log("Server is listening on port 3128");
});
>>>>>>> d840e5da5fcfe1a51bb33ee563de9dd9aac84f20
