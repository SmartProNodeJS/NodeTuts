var http=require("http");

var httpServer=http.createServer(function(request,response){
    var method=request.method
        url=request.url

    ;
console.log("Method: "+method+"\nURL"+url);
var url_arr = url.split("?");
//Comment abc
if("/hello"==url_arr[0])
{
response.statusCode=200;
    response.setHeader('content-type', 'text/html; charset=utf-8');
    response.write("<html><title>Test</title><body><h1>"+decodeURI(url_arr[1].split("=")[1])+"</h1></body></html>");
    response.end();

}else
{

    response.statusCode=404;
    response.end();
}
    

}).listen(8080,function(){
        console.log("Server is listening on post 8080");
});