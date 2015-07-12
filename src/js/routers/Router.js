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
    'home': 'homePage',
    "default": "defaultPage",
    "map": "mapPage"
  },

  initialize: function initialize() {

    //global model

    //global collection
    this.areaCollection = new AreaCollection(Data.area);
    this.mobCollection = new MobCollection(Data.mob);

    //views
    this.homeView = new HomeView({
      areaCollection: this.areaCollection,
      mobCollection: this.mobCollection
    });

    this.defaultView = new DefaultView({
      areaCollection: this.areaCollection,
      mobCollection: this.mobCollection
    });

    this.showHome = false;

    this.mapView = new MapView();

    console.log('Welcome!!');

    Backbone.history.start();
  },

  // execute: function execute(callback, args, name)  {
  //   console.log('execute!')
  //   if (callback) callback.apply(this, args);
  // },

  homePage: function homePage() {
    this.homeView.render();
    this.showHome = true;

    $( ":mobile-pagecontainer" ).pagecontainer( "change",
       this.homeView.$el, {
       reverse: true, changeHash: false} );
  },

  defaultPage: function defaultPage() {

    if ( !this.showHome ) {
      this.navigate('', {trigger: true, replace: true});
      return this;
    }

    this.defaultView.render();

     $( ":mobile-pagecontainer" ).pagecontainer( "change",
        this.defaultView.$el, {
        reverse: false, changeHash: false } );
  },

  mapPage: function mapPage() {

    if ( !this.showHome ) {
      this.navigate('', {trigger: true, replace: true});
      return this;
    }

    $( ":mobile-pagecontainer" ).pagecontainer( "change",
       this.mapView.$el, {
       reverse: false,  changeHash: false } );
  }
});

})();
