(function() {

  module.exports = Backbone.Model.extend({
    defaults: {
      name: 'Mob',
      area: 1,
      lv: 1,
      pos: [],
      db: null,
      selected: false,
      killed: false
    },

    initialize: function () {
      if ( window.CheckAgent.isSmartPhone() ){
        this.set('db', null);
      }
    }
  });

})();
