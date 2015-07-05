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
      this.mobListViews = [];
      //選択されたモブだけ表示する
      this.selectedOnly = options.selectedOnly || false;

    },

    render: function() {
      var data = this.model.toJSON();
      var html = this.template(data);
      var mobCollection = this.model.mobCollection;
      this.$el.attr(this.attr).html(html);

      var $mobList = this.$el.find('.mobs');

      mobCollection.each(function(mob) {
        //if (this.selectedOnly && mob.get('selected') || !this.selectedOnly) {
          var view = new MobView({model:mob, activeClass: (this.selectedOnly? false : true) });
          $mobList.append(view.render().$el);
          this.mobListViews.push(view);
        //}
      }, this);
      return this;
    }
  });

})();
