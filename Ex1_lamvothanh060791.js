var fs = require("fs");
var cbfn = function(err,content){
console.log("File content: " + content);
};
var txtContent = fs.readFileSync("sample.txt");
console.log("File content: " + txtContent);
console.log("Cont...");

fs.readFile("sample.txt",cbfn);
console.log("Cont...Asyc");
//fs.readFile("sample.txt", function(err,content){
//console.log("File content: " + content
//)
//console.log("Cont......Async");
//});
