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
      // 'data-role':'collapsibleset',
      'data-filter':true,
      'data-inset':true
    },

    initialize: function(opt) {

      console.log('[initialize] AreaListView');

      this.areaCollection = opt.areaCollection;

      this.collectionViews = [];

      this.$el.attr(this.attr);

      this.areaCollection.each(function(dat) {
          this.collectionViews.push(new AreaView({model: dat}));
      }, this);
    },

    render: function() {
      console.log('[render] AreaListView');

      _.each(this.collectionViews, function(view) {
        this.$el.append(view.render().el);
      }, this);

    }
  });

})();
