module.exports = Backbone.Router.extend({

    routes: {
      '': 'homePage'
    },
    
    initialize: function() {
      Backbone.history.start();
    },

    homePage: function() {
      console.log('Welcome!!');
    }

  });
