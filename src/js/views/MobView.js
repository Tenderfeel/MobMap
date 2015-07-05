(function() {

  /*
  Mob Model View

  表向き表示されるのはモンスターの名前のみ

  <script type="text/x-handlebars-template" id="mob-template">
    <a class="ui-btn">{{name}}</a>
  </script>
  */
  module.exports = Backbone.View.extend({

    tagName: 'li',
    className:'mob',
    template: Handlebars.compile($("#mob-template").html()),
    events: {
       'click': 'handleClick'
     },
     
    initialize: function(options) {

      this.model = options.model;
      this.activeClass = options.activeClass || false;

      this.model.on('change', this.handleChange, this);
    },

    render: function() {
      var html = this.template(this.model.toJSON());
      this.$el.attr({
              'data-id': this.model.get('id')
            }).html(html);
      return this;
    },

    handleChange: function() {
      if ( this.activeClass ) {
        this.$el.find('.ui-btn')
              .toggleClass('ui-btn-active', this.model.get('selected'));
      }
    },

    /*
      Handling Click Event
    */
    handleClick: function() {
      this.model.set('selected', !this.model.get('selected'));
    }
  });

})();
