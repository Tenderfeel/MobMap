(function(){

var HomeView = require('../views/HomeView');
var DefaultView = require('../views/DefaultView');
var MapView = require('../views/MapView');

module.exports = Backbone.Router.extend({

  routes: {
    '': 'homePage',
    "default": "defaultPage",
    "map": "mapPage"
  },

  initialize: function() {
    this.homeView = new HomeView();
    this.defaultView = new DefaultView();
    this.mapView = new MapView();

    console.log('Welcome!!');

    Backbone.history.start();
  },

  homePage: function() {
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
