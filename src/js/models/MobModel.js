(function() {
  
  module.exports = Backbone.Model.extend({
    defaults: {
      name: 'Mob',
      lv: 1,
      pos: [],
      selected: false
    }
  });

})();
