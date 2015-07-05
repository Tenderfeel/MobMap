(function() {

  var MobModel = require('../models/MobModel');

  module.exports = Backbone.Collection.extend({
    model: MobModel
  });

})();
