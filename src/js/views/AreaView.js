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
      'data-role': 'collapsible'
      //,'data-collapsed': false
    },
    template: Handlebars.compile($("#area-template").html()),

    initialize: function(options){
      console.log('[initialize] AreaView -- '+ this.model.get('name'));
      this.mobViews = [];
      //選択されたモブだけ表示する
      this.selectedOnly = options.selectedOnly || false;
      this.mobCollection = options.mobCollection;

    },

    render: function() {
      var data = this.model.toJSON();
      var html = this.template(data);
      this.$el.attr(this.attr).html(html);

      var $mobList = this.$el.find('.mobs');

      _.each(this.model.get('mobs'), function(mob) {
          var model = this.mobCollection.get(mob);
        //if (this.selectedOnly && mob.get('selected') || !this.selectedOnly) {
          var view = new MobView({model:model, activeClass: (this.selectedOnly? false : true) });
          $mobList.append(view.render().$el);
          this.mobViews.push(view);
        //}
      }, this);
      return this;
    }
  });

})();
