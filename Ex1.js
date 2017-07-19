var fs = require("fs");
var Promise = require('promise');

var cbfn = function(err, content) {
};
var txtContent = fs.readFileSync("sample.txt");
console.log("File content: "+txtContent);
console.log("Cont...Sync "); 

var readFileWithPromise = function(filename){
    return new Promise(function(resolve, reject){
        fs.readFile(filename, function(err, content){
            if(err) reject(err);
            else resolve(String(content));
        });
    });
}

readFileWithPromise("sample.txt").then(function(content){
    console.log("In Promise func: "+content);
}).catch(function(err){
    console.log(err);
});