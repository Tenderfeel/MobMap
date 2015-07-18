(function() {

  var AreaView = require('../views/AreaView');

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

      this.areaViews = [];
    },

    handleNav: function handleNav(e) {

      var href = e.target.getAttribute('data-href');

        window.router.navigate(href, {trigger: true});

    },

    render: function render() {
      var self = this;
      if ( !this.areaViews.length ) {
        this.areaCollection.each(function(dat) {
          var view = new AreaView({
              model: dat,
              mobCollection: self.mobCollection,
              selectedOnly: true
           });
            self.areaViews.push(view);
            self.$arealist.append(view.render().el);
        }, this);
      }
      return this;
    },

    remove: function remove() {
      this.AreaListView.remove();
      delete this.areaViews;
      delete this.areaCollection;
      delete this.mobCollection;
      delete this.$arealist;
    }

  });


})();
