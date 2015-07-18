(function() {

    var MobView = require('../views/MobView');

/**
 AreaView
 エリアビュー

 AreaModel用のビュー

Template:
<script type="text/x-handlebars-template" id="area-template">
  <h3 class="name">
    {{name}}
    		{{#if count}}<span class="ui-li-count">{{count}}</span>{{/if}}
  </h3>
  <ul class="mobs" data-role="listview" data-inset="false"></ul>
</script>

*/
  module.exports = Backbone.View.extend({

    tagName: 'div',
    className: 'area',
    attr: {
      //'data-role': 'collapsible'
    },
    template: Handlebars.compile($("#area-template").html()),

    initialize: function(options){
      console.log('[initialize] AreaView -- '+ this.model.get('name'));
      this.mobViews = [];
      //選択されたモブだけ表示する
      this.selectedOnly = options.selectedOnly;
      this.mobCollection = options.mobCollection;
      this.attr = _.extend(this.attr, options.attr || {});

    },

    render: function() {
      var self = this,
          data = this.model.toJSON(),
          html = this.template(data);

      if( this.selectedOnly
          && !this.mobCollection.selected.area[this.model.get('id')] ) {
        return this;
      }

      //this.$el.attr(this.attr).html(html);
      this.$el.html(html).collapsible(this.attr);

      var $mobList = this.$el.find('.mobs');
      $mobList.listview({
        inset: false
      });

      _.each(this.model.get('mobs'), function(mob) {
          var view,
              model = this.mobCollection.get(mob),
              posData = this._getMobPosition(_.first(model.get('pos')));


        //選択されたモブのみ表示 or 全表示の場合
        if (this.selectedOnly
            && model.get('selected') || !self.selectedOnly) {
          view = new MobView({
            model:model,
            posData: (self.selectedOnly? posData : null),
            activeClass: (self.selectedOnly? false : true)
          });
          $mobList.append(view.render().$el);
          this.mobViews.push(view);
        }

      }, this);
      return this;
    },

    _getMobPosition: function _getMobPosition(posId) {
      return _.findWhere(this.model.get('pos'), {id: posId});
    }

  });

})();
