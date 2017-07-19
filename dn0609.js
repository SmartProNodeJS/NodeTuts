var fs = require('fs');

// var callbackFX = function (err, data) {
//     console.log('File content: ' + data);
// };

var fileContent = fs.readFileSync('sample.txt');

console.log('File content: ' + fileContent);
console.log('Continue sync...');

fs.readFile('sample.txt', 'utf-8', (err, data) => {
    console.log('File content: ' + data);
});

console.log('Continue acsync...');
