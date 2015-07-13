(function() {

  /*
  Mob Model View

  モンスターのビュー

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

    initialize: function initialize(opt) {

      //this.model = opt.model;
      this.activeClass = opt.activeClass || false;
      this.posData = opt.posData;

      this.model.on('change', this.handleChange, this);
    },

    render: function render() {
      var html = this.template(this.model.toJSON());
      this.$el.attr({
              'data-id': this.model.get('id')
            }).html(html);

      if ( this.posData ) {
        this.$el.append('<p class="ui-li-aside">' + this.posData.name
            + ' (' + this.posData.x + ',' + this.posData.y + ')</p>');
      }
      return this;
    },

    handleChange: function handleChange() {
      if ( this.activeClass ) {
        this.$el.find('.ui-btn')
              .toggleClass('ui-btn-active', this.model.get('selected'));
      }
    },

    /*
      Handling Click Event
    */
    handleClick: function handleClick() {
      this.model.set('selected', !this.model.get('selected'));
    }
  });

})();
