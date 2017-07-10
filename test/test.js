var expect  = require("chai").expect;
var request = require("request");

describe("Users", function() {

  describe("User should added", function() {
    var url = "http://localhost:8081/users/";
    it("returns status 200OK", function(done) {
      request(url, function(error, response, body){
        expect(response.statusCode).to.equal(200);
        done();
      });
    });
  });
  describe("User should be listed", function() {
    var url = "http://localhost:8081/users/";
    it("returns status 200", function() {});
  });

});