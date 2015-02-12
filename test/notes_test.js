'use strict';

var chai = require('chai');
var chaihttp = require('chai-http');
var fs = require('fs');
require('../http_server');

chai.use(chaihttp);

var expect = chai.expect;

describe('simple post request', function() {
  it('responds to a post request', function(done) {

    var expected_results = {
      "id": "2",
      "name": "george",
      "sparkles": "125",
      "msg": "this was added on the server"
    };

    console.dir(expected_results);

    chai.request('localhost:3000')
      .post('/notes/2')
      .send({"id": 2, "name": "george", "sparkles" : "125"})
      .end(function(err, res) {
        console.dir(res.body);
        expect(err).to.eql(null);
        expect(res.body).to.eql(expected_results);
        done();
      });
  });
});

describe('simple put request', function() {
  it('responds to a put request', function(done) {

    var expected_results = {
      "id": "4",
      "name": "george",
      "sparkles": "125"
    };

    console.dir(expected_results);

    chai.request('localhost:3000')
      .post('/notes/4')
      .send({"id": 4, "name": "sam", "sparkles" : "789"});

    chai.request('localhost:3000')
      .put('/notes/4')
      .send({"id": 4, "name": "george", "sparkles" : "125"})
      .end(function(err, res) {
        console.dir(res.body);
        expect(err).to.eql(null);
        expect(res.body).to.eql(expected_results);
        done();
      });
  });
});

describe('simple patch request', function() {
  it('responds to a patch request', function(done) {

    var expected_results = {
      "id": "3",
      "name": "fred",
      "sparkles": "789"
    };

    console.dir(expected_results);

    chai.request('localhost:3000')
      .post('/notes/3')
      .send({"id": 3, "name": "sam", "sparkles" : "789"});

    chai.request('localhost:3000')
      .patch('/notes/3')
      .send({"name": "fred"})
      .end(function(err, res) {
        console.dir(res.body);
        expect(err).to.eql(null);
        expect(res.body).to.eql(expected_results);
        done();
      });
  });
});

describe('simple delete request', function() {
  it('responds to a delete request', function(done) {

    var expected_results = "deleted ./data/notes5.json"

    console.dir(expected_results);

    chai.request('localhost:3000')
      .post('/notes/5')
      .send({"id": 5, "name": "allison", "sparkles" : "777"})
      .end(function(err, res) {
         chai.request('localhost:3000')
            .del('/notes/5')
            .end(function(err, res) {

              var expected_results = "ENOENT";
              var result = "";
              //fs.open('./data/notes5.json', 'r', function (err, fd) {
              //    result = "file does not exist";
              //});

              fs.open('./data/notes5.json', 'r', function (err2, fd){
                console.log("result in DELETE in notes_test.js")
                console.dir(err2);
                expect(err2.code).to.eql(expected_results);
              });

              expect(err).to.eql(null);
              done();
        });
      });

  });
});

describe('simple patch request', function() {
  it('responds to a patch request', function(done) {

    var expected_results = {
      "id": "3",
      "name": "fred",
      "sparkles": "789"
    };

    console.dir(expected_results);

    chai.request('localhost:3000')
      .post('/notes/3')
      .send({"id": 3, "name": "sam", "sparkles" : "789"});

    chai.request('localhost:3000')
      .patch('/notes/3')
      .send({"name": "fred"})
      .end(function(err, res) {
        console.dir(res.body);
        expect(err).to.eql(null);
        expect(res.body).to.eql(expected_results);
        done();
      });
  });
});
