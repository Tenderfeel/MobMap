(function(){

var HomeView = require('../views/HomeView');
var DefaultView = require('../views/DefaultView');
var MapView = require('../views/MapView');
var Data = require('../data');
var AreaCollection = require('../collections/AreaCollection');
var MobCollection = require('../collections/MobCollection');
var CountModel = require('../models/CountModel');

module.exports = Backbone.Router.extend({

  routes: {
    '': 'homePage',
    "default": "defaultPage",
    "map": "mapPage"
  },

  initialize: function() {

    //global model
    
    //global collection
    this.areaCollection = new AreaCollection(Data.area);
    this.mobCollection = new MobCollection(Data.mob);

    //views
    this.homeView = new HomeView({
      areaCollection: this.areaCollection,
      mobCollection: this.mobCollection
      //totalTargetCount: this.totalTargetCount
    });
    this.defaultView = new DefaultView();
    this.mapView = new MapView();

    console.log('Welcome!!');

    Backbone.history.start();
  },

  homePage: function() {
    this.homeView.render();

    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#home", {
       reverse: true, changeHash: false} );
  },

  defaultPage: function() {
     $( ":mobile-pagecontainer" ).pagecontainer( "change", "#default", {
        reverse: false, changeHash: false } );
  },

  mapPage: function() {
    $( ":mobile-pagecontainer" ).pagecontainer( "change", "#map", {
       reverse: false,  changeHash: false } );
  }
});

})();
