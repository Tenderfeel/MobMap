var $ = require('jquery');
//var Backbone = require('backbone');
//var chai = require('chai');
//var expect = chai.expect;
var assert = require("assert")
var MobModel = require('../src/js/models/MobModel.js');
var AreaModel = require('../src/js/models/AreaModel.js');

describe('MobModel', function(){

  var model = new MobModel({id: 1, lv: 50, name: 'Mob', pos:[1], area: 1});

  describe('Attribute type', function(){
    it('should return number Mob ID', function(){
      assert.strictEqual(1, model.get('id'));
    });

    it('should return string Mob Name', function(){
      assert.strictEqual('Mob', model.get('name'));
    });

    it('should return Area ID', function(){
      assert.strictEqual(1, model.get('area'));
    });

    it('should return array Mob Pos', function() {
      assert.equal('object', typeof model.get('pos'));
    });
  });

});

describe('AreaModel', function(){

  var model = new AreaModel({
      id: 1,
      name: 'Area 1',
      pos: [1,2,3,4,5,6,7,8,9,10],
      mobs:[
        {id: 1, lv: 50, name: 'Mob2', pos:[1], area: 1},
        {id: 2, lv: 51, name: 'Mob1', pos:[2], area: 1}
      ]
    });

  describe('Attribute type', function() {
    it('should return number Area ID', function() {
      assert.strictEqual(1, model.get('id'));
    });

    it('should return array Area Pos', function() {
      assert.equal('object', typeof model.get('pos'));
    });

    it('should return array Area Mob', function() {
      assert.equal('object', typeof model.get('mobs'));
    });


  });

});
