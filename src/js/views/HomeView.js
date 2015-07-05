(function() {

  var AreaListView = require('../views/AreaListView');

  module.exports = Backbone.View.extend({
    el: "#home",

    initialize: function(opt) {
      this.$arealist = this.$el.find('#home-arealist');
      this.$consol = this.$el.find('#arealist-console');

      this.AreaListtView = new AreaListView({
        el:this.$arealist,
        areaCollection: opt.areaCollection
      });
    },

    render: function() {
      this.AreaListtView.render();
    }
  });

})();
