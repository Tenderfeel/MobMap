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

      if ( this.areaViews.length ) {
        return this;
      }

      this.areaCollection.each(function(dat) {

        if ( self.mobCollection.selected.area[dat.get('id')] > 0) {
          var view = new AreaView({
              model: dat,
              collection: self.mobCollection,
              selectedOnly: true,
              attr: {
                collapsed: false
              }
           });
            self.areaViews.push(view);
            self.$arealist.append(view.render().el);
        }
      }, this);
      return this;
    },

    reset: function reset() {

      if ( this.areaViews.length ) {
        _.each(this.areaViews, function(view) {
          view.reset();
          view.remove();
        });
      }

      this.$arealist.empty();
      this.areaViews = [];
    }

  });


})();
