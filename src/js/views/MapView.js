(function() {

  /**
   * MapView
   *
   * .map#map-[areaId]
   *  >img.map-base
   *  +svg.map-svg>g>.pos#map-[areaId]-[posId]
   *  +img.map-text
   *
   * @extend {Backbone.View}
   */
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

    render: function render() {
      var self = this;

      this.areaCollection.each(function(areaModel) {
        var $map = $('#map-' + areaModel.get('id')),
            $mobList = $map.find('.moblist');

        _.each(areaModel.get('mobs'), function(mob) {
          var mobModel = self.mobCollection.get(mob);
          if ( mobModel.get('selected') ) {
            _.each(mobModel.get('pos'), function(pos) {
              $('#map-' + areaModel.get('id') + '-' + pos).show();
              //$mobList.append('<li>Lv.' + mobModel.get('lv') + ' ' + mobModel.get('name') + '</li>')
            });
          }
        });
      });

    }

  });

})();
