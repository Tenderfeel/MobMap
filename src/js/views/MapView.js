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

    },

    handleNav: function handleNav(e) {

      var href = e.target.getAttribute('data-href');

      window.router.navigate(href, {trigger: true});

    },

    render: function render() {
      var self = this;

      this.areaCollection.each(function(areaModel) {
        var $map = $('#map-' + areaModel.get('id')),
            areaId = areaModel.get('id'),
            selectedPos = [];

        if ( !self.mobCollection.selected.area[areaId] ){
          $map.hide();
        } else {
          $map.show();

          _.each(areaModel.get('mobs'), function(mob) {
            var mobModel = self.mobCollection.get(mob);

            _.each(mobModel.get('pos'), function(pos) {
              if ( mobModel.get('selected') || _.indexOf(selectedPos, pos) !== -1) {
                 $('#map-' + areaId + '-' + pos).show();
                 selectedPos.push(pos);
              } else {
                 $('#map-' + areaId + '-' + pos).hide();
              }
            });
          });
        }

      });

    },

    reset: function reset() {
      this.$el.find('.pos:visible').each(function(el) {
        el.hide();
      });
    }

  });

})();
