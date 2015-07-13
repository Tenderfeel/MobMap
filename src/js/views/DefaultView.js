(function() {

  var AreaListView = require('../views/AreaListView');

  /**
   * DefaultView
   * @type {*}
   */
  module.exports = Backbone.View.extend({
    el: "#default",

    events: {
      'click .btn-nav': 'handleNav'
    },

    initialize: function initialize(opt) {
      this.$arealist = this.$el.find('#default-arealist');

      this.areaCollection = opt.areaCollection || {};
      this.mobCollection = opt.mobCollection || {};

      this.AreaListView = new AreaListView({
        el:this.$arealist,
        areaCollection: this.areaCollection,
        mobCollection: this.mobCollection,
        selectedOnly: true
      });

    },

    handleNav: function handleNav(e) {

      var href = e.target.getAttribute('data-href');

        window.router.navigate(href, {trigger: true});

    },

    render: function render() {
      this.AreaListView.render();
    }

  });


})();
