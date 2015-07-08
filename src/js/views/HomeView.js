(function() {

  var AreaListView = require('../views/AreaListView');

  module.exports = Backbone.View.extend({
    el: "#home",

    initialize: function initialize(opt) {
      this.$arealist = this.$el.find('#home-arealist');
      this.$consol = this.$el.find('#arealist-console');
      this.$counter = this.$consol.find('.arealist-counter');
      this.$resetBtn = this.$consol.find('.btn-reset');


      this.AreaListView = new AreaListView({
        el:this.$arealist,
        areaCollection: opt.areaCollection
      });

      this.AreaListView.on('click', function() {
        console.log(this)
      });

      //this.totalTargetCount = opt.totalTargetCount;

      //opt.totalTargetCount.on('change:total', this.handleChangeTargetCount, this);
    },

    render: function render() {
      this.AreaListView.render();
    },

    handleChangeTargetCount: function handleChangeTargetCount() {

      var total = this.totalTargetCount.get('total');
      this.$counter.html('Selected: ' + total);
      this.$resetBtn.toggleClass('ui-disabled', !total);
    }
  });

})();
