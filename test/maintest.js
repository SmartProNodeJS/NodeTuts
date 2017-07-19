var chai  = require("chai");
var chaiHttp = require('chai-http');
var httpServer = require('../app');
var should = chai.should();
var expect = chai.expect;
var Menu = require('../models/main_menu');

chai.use(chaiHttp);
describe("Menu", function() {
  it("Check main menu", function(done){
    expect(Menu).to.be.an('array');
    done();
  });
});

describe("League/Player", function() {
    it("Player should listed", function(done) {
      chai.request(httpServer).get('/player/').end(function(err, res){
        res.should.have.status(200);
        res.text.should.include('<table class="table table-bordered table-hover">');
        done();
      });    
    });

    it('Should return all sports', function(done){
      chai.request(httpServer).get('/sports').end(function(err, res){
        res.should.have.status(200);
        expect(res.body).to.have.lengthOf(4);
        done();
      });  
    });    

     it('Should return all sports - Promise', function(){
        var Sports = require('../models/sports');
        return Sports.findAll().then(function(sports){
          expect(sports).to.be.a('array');
        });
     });    
});