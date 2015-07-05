var $ = require('jquery');
//var Backbone = require('backbone');
//var chai = require('chai');
//var expect = chai.expect;
var assert = require("assert")
var MobModel = require('../src/js/models/MobModel.js');

describe('MobModel', function(){

  var model = new MobModel({id: 1, lv: 50, name: 'Mob', pos:[1], area: 1});

  describe('get(name)', function(){
    it('should return number Mob ID', function(){
      assert.equal(1, model.get('id'));
    });
    it('should return string Mob Name', function(){
      assert.equal('Mob', model.get('name'));
    });
  });

});
