(function() {

  module.exports = Backbone.View.extend({
    el: "#map",

    events: {
      'click .btn-nav': 'handleNav'
    },

    initialize: function initialize(opt) {
      this.areaCollection = opt.areaCollection || {};
      this.mobCollection = opt.mobCollection || {};

      this.$maplist = this.$el.find('#maplist');
    },

    handleNav: function handleNav(e) {

      var href = e.target.getAttribute('data-href');

      window.router.navigate(href, {trigger: true});

    },

  });

})();
