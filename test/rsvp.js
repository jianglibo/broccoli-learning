var rsvp = require('rsvp');
var chai = require("chai");
var chaiAsPromised = require("chai-as-promised");

var assert = require('assert');
chai.should();
var expect = chai.expect;
var assert = chai.assert;

chai.use(chaiAsPromised);

describe('RSVP', function() {
  beforeEach(function() {
    console.log('start........');
  });

  describe('#resolve()', function() {
    it('should return a', function() {
      return rsvp.Promise.resolve("a").then(function(v) {
        return v;
      }).should.eventually.equal("a");
    });
  });

  describe('#reject()', function() {
    it('should return reason', function() {
      return rsvp.Promise.reject("reason").then(function(v) {
        return v;
      }, function(reason) {
        return reason;
      }).should.eventually.equal("reason");
    });
  });
});
