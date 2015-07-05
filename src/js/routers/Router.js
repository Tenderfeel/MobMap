
var HomeView = require('../views/HomeView');

module.exports = Backbone.Router.extend({

    routes: {
      '': 'homePage'
    },

    initialize: function() {
      // Instantiates a new HomePage View
      this.homeView = new HomeView();

      Backbone.history.start();
    },

    homePage: function() {
      console.log('Welcome!!');
    }

  });
