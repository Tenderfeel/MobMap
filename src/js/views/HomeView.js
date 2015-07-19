(function() {

  var AreaView = require('../views/AreaView');

  module.exports = Backbone.View.extend({
    el: "#home",

    events: {
      'click .btn-nav': 'handleNav',
      'click .btn-reset': 'handleReset',
      'click #btn-help': 'handleHelp'
    },

    initialize: function initialize(opt) {
      this.$arealist = $('#home-arealist');
      this.$counter = this.$el.find('.arealist-counter');
      this.$resetBtn = this.$el.find('.btn-reset');

      this.areaCollection = opt.areaCollection || {};
      this.mobCollection = opt.mobCollection || {};

      this.areaViews = [];

      this.$navBtns = this.$el.find('.btn-nav');
      this.$navBtns.addClass('ui-disabled');

      this.listenTo(this.mobCollection, 'change:selected', this.handleChangeTargetCount, this);
    },

    handleHelp: function handleHelp() {
      $('#help-dialog').popup( "open" );
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

    /**
    * Render
    */
    render: function render() {
      var self = this;
      if ( !this.areaViews.length ) {
        this.areaCollection.each(function(dat) {
          var view = new AreaView({
              model: dat,
              collection: self.mobCollection,
              selectedOnly: false
           });
            self.areaViews.push(view);
            self.$arealist.append(view.render().el);
        }, this);
      }
      return this;
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
