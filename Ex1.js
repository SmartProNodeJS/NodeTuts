var fs = require("fs");
var cbfn = function(err, content){
    console.log("File content: "+content);
};
var txtContent = fs.readFileSync("sample.txt");
console.log("File content: " + txtContent);
console.log("Cont ... Sync");

fs.readFile("sample.txt",cbfn);

console.log("Cont .... Async");