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
      this.attr = _.extend(this.attr, options.attr || {});

    },

    collapse: function() {
      this.$el.collapsible('collapse');
    },

    render: function() {
      var self = this,
          data = this.model.toJSON(),
          html = this.template(data);

      /**
       * 選択されたモブのみ表示の場合に、1体も選択されていなければスキップ
       */
      if( this.selectedOnly
          && !this.collection.selected.area[this.model.get('id')] ) {
        return this;
      }

      //this.$el.attr(this.attr).html(html);
      this.$el.html(html).collapsible(this.attr);

      var $mobList = this.$el.find('.mobs');

      this._createMobList($mobList);

      $mobList.listview({
        inset: false,
        icon: false,
        splitIcon: "action"
      });

      return this;
    },

    _createMobList: function _createMobList($mobList) {
      /**
       * Create of Mob List
       */
      _.each(this.model.get('mobs'), function(mob) {
        var view,
            model = this.collection.get(mob),
            posData = this._getMobPosition(_.first(model.get('pos')));

        //選択されたモブのみ表示 or 全表示の場合
        if (this.selectedOnly && model.get('selected')
            || !self.selectedOnly) {

          view = new MobView({
            model:model,
            /**
             * 選択されたモブのみ表示する場合、座標データを渡す
             */
            posData: (self.selectedOnly? posData : null),
            /**
             * MobViewのモード切り替え
             * 選択されたモブのみ表示→kill
             * 全表示→check
             */
            mode: (self.selectedOnly? 'kill' : 'check')
          });

          $mobList.append(view.render().$el);
          this.mobViews.push(view);
        }

      }, this);

      return this;
    },

    _getMobPosition: function _getMobPosition(posId) {
      return _.findWhere(this.model.get('pos'), {id: posId});
    },

    reset: function reset () {
      _.each(this.mobViews, function(view) {
        view.remove();
      });
      this.movViews = [];
    }

  });

})();
