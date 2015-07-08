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

      this.areaCollection = opt.areaCollection || {};
      this.mobCollection = opt.mobCollection || {};

      this.collectionViews = [];

      this.$el.attr(this.attr);


    },

    render: function() {
      console.log('[render] AreaListView');

      if ( !this.collectionViews.length ) {
        this.areaCollection.each(function(dat) {
          var view = new AreaView({model: dat, mobCollection: this.mobCollection});
            this.collectionViews.push(view);
            this.$el.append(view.render().el);
        }, this);
      }

    }
  });

})();
