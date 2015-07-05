(function() {

  var AreaModel = require('../models/AreaModel');

  module.exports = Backbone.Collection.extend({
    model: AreaModel
  });

})();
