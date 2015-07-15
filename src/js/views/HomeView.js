(function() {

  var AreaListView = require('../views/AreaListView');

  module.exports = Backbone.View.extend({
    el: "#home",

    events: {
      'click .btn-nav': 'handleNav',
      'click .btn-reset': 'handleReset'
    },

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

      this.$navBtns = this.$el.find('.btn-nav');
      this.$navBtns.addClass('ui-disabled');

      this.mobCollection.on('change:selected', this.handleChangeTargetCount, this);
    },

    handleNav: function handleNav(e) {

      var href = e.target.getAttribute('data-href');


      window.router.navigate(href, {trigger: true});

    },

    /**
     * リセットボタンが押された
     */
    handleReset: function handleReset() {
      this.mobCollection.each(function(model) {
        model.set('selected', false);
      });
    },

    render: function render() {
      this.AreaListView.render();
    },

    /*
      Mobが選択された時、数に応じてカウンター・リセットボタン・フッターボタンを変更する
    */
    handleChangeTargetCount: function handleChangeTargetCount() {
      var total = this.mobCollection.selected.total;
      this.$counter.html('Selected: ' + total);
      this.$resetBtn.toggleClass('ui-disabled', !total);

      this.$navBtns.toggleClass('ui-disabled', !total);
    }
  });

})();
