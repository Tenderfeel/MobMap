(function() {

  var AreaView = require('../views/AreaView');
 /**
  AreaListView
  エリアコレクション用のView

  使用するCollectionは全体で共通のもの

  AreaListView(=AreaCollection)
   +- AreaView(=AreaModel, MobCollection)
       +- MobView(MobModel)
 */

  module.exports = Backbone.View.extend({

    attr: {
      'data-role':'collapsibleset',
      'data-filter': true,
      'data-inset': true,
      'data-children': "> div, > div div ul li"
    },

    initialize: function(opt) {

      console.log('[initialize] AreaListView');

      this.areaCollection = opt.areaCollection || {};
      this.mobCollection = opt.mobCollection || {};
      this.selectedOnly = opt.selectedOnly;

      this.collectionViews = [];

      this.$el.attr(this.attr);


    },

    render: function render() {
      console.log('[render] AreaListView');
      var self = this;

      if ( this.selectedOnly && !this.mobCollection.selected.total ) {
        this.$el.html('<p>モブが選択されていません</p>');
        return this;
      }

      if ( !this.collectionViews.length ) {
        this.areaCollection.each(function(dat) {
          var view = new AreaView({
              model: dat,
              mobCollection: self.mobCollection,
              selectedOnly: self.selectedOnly
           });
            this.collectionViews.push(view);
            this.$el.append(view.render().el);
        }, this);
      }
      return this;
    }
  });

})();
