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

      this.mode = opt.mode || null;
      this.posData = opt.posData;

      if ( this.mode === 'check' ) {
        this.listenTo(this.model, 'change:selected', this.handleSelected, this);
      }

      if ( this.mode === 'kill' ) {
        this.listenTo(this.model, 'change:killed', this.handleKilled, this);
      }
    },

    render: function render() {
      var data = this.model.toJSON();
      //マップ座標データをテンプレートに渡す
      data.position = this.posData;
      var html = this.template(data);

      this.$el.attr({
              'data-id': this.model.get('id')
            }).html(html);

      if ( this.mode === 'kill') {
        this.handleKilled();
      }

      return this;
    },

    /**
     * Handling change:selected event of MobModel
     */
    handleSelected: function handleSelected() {
      this.$el.find('.ui-btn')
              .toggleClass('ui-btn-active ui-icon-check ui-btn-icon-left ui-nodisc-icon', this.model.get('selected'));
    },

    /**
     * Handling change:killed event of MobModel
     */
    handleKilled: function handleKilled() {
      this.$el.find('.ui-btn')
              .toggleClass('mob-killed', this.model.get('killed'));
    },

    /*
      Handling Click Event

      表示モード(this.mode)によってmodelの操作を変える。
      check : 選択する
      kill : selectedなモブを倒す
    */
    handleClick: function handleClick() {

      switch ( this.mode ) {
        case 'check':
          this.model.set('selected', !this.model.get('selected'));
          break;

        case 'kill':
          this.model.set('killed', !this.model.get('killed'));
          break;

        default:
          break;
      }

    }
  });

})();
