(function() {

  var AreaListView = require('../views/AreaListView');

  module.exports = Backbone.View.extend({
    el: "#home",

    initialize: function initialize(opt) {
      this.$arealist = this.$el.find('#home-arealist');
      this.$consol = this.$el.find('#arealist-console');
      this.$counter = this.$consol.find('.arealist-counter');
      this.$resetBtn = this.$consol.find('.btn-reset');

      this.areaCollection = opt.areaCollection || {}
      this.mobCollection = opt.mobCollection || {};

      this.AreaListView = new AreaListView({
        el:this.$arealist,
        areaCollection: this.areaCollection,
        mobCollection: this.mobCollection
      });


      this.mobCollection.on('change:selected', this.handleChangeTargetCount, this);
    },

    render: function render() {
      this.AreaListView.render();
    },

    /*
      Mobが選択された時、数に応じてカウンターとリセットボタンを変更する
    */
    handleChangeTargetCount: function handleChangeTargetCount() {
      var total = this.mobCollection.selected.total;
      this.$counter.html('Selected: ' + total);
      this.$resetBtn.toggleClass('ui-disabled', !total);
    }
  });

})();
