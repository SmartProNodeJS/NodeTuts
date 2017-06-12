var express = require('express');
var app = express();
app.use(express.static("public/"));
app.get('/', function (req, res) {
    res.send('Hello World');
});
app.get('/test', function (req, res) {
    res.send('Hello World from root test');
});
app.get('/testpost', function (req, res) {
    res.send('<html><body><form name="testpost" method="post" action="/testpost"><input type="submit" value="Post it" /></form></body></html>');
});
app.post('/testpost', function (req, res) {
    res.send('Test post');
});
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port
    console.log("Example app listening at http://%s:%s", host, port)
})
