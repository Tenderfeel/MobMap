var $ = require('jquery');
//var Backbone = require('backbone');
//var chai = require('chai');
//var expect = chai.expect;
var assert = require("assert")
//var Router = require('../src/js/routers/Router.js');

describe('Array', function(){
  describe('#indexOf()', function(){
    it('should return -1 when the value is not present', function(){
      assert.equal(-1, [1,2,3].indexOf(5));
      assert.equal(-1, [1,2,3].indexOf(0));
    })
  })
});
