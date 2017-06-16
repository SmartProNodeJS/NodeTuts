var fs = require("fs");

var txtContent=fs.readFileSync("sample.txt");
var cb = function(err,content){

console.log("File content: "+ content);


};
console.log("File content: "+ txtContent);
console.log("Cont......Sync ");

fs.readFile("sample.txt", cb);
console.log("Cont......Async ");