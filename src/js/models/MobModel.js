(function() {

  module.exports = Backbone.Model.extend({
    defaults: {
      name: 'Mob',
      area: 1,
      lv: 1,
      pos: [],
      selected: false
    }
  });

})();
