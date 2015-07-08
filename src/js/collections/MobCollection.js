(function() {

  var MobModel = require('../models/MobModel');

  /*
   MobModel Collection

  */
  module.exports = Backbone.Collection.extend({
    model: MobModel,
    initialize: function initialize() {

      this.selected = {
        total:0,
        area: {
          1: 0,
          2: 0,
          3: 0,
          4: 0,
          5: 0,
          6: 0
        }
      };

      this.on('change:selected', this.handleSelected, this);
    },

    handleSelected: function handleSelected(model) {
      if (model.get('selected')) {
        this.selected.total++;
        this.selected.area[model.get('area')]++;
      } else {
        this.selected.total--;
        this.selected.area[model.get('area')]--;
      }
      console.log(this.selected.total, this.selected.area);
    }
  });

})();
