(function() {

  var MobCollection = require('../collections/MobCollection');

  module.exports = Backbone.Model.extend({
    defaults: {
      name: 'Area',
      pos: [],
      mobs: []
    },
    initialize: function() {
    }
  });

})();
