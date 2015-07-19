(function() {

  /**
   * MapView
   *
   * .map#map-[areaId]
   *  >img.map-base
   *  +svg.map-svg>g>.pos#map-[areaId]-[posId]
   *  +img.map-text
   *
   * @extend {Backbone.View}
   */
  module.exports = Backbone.View.extend({
    el: "#map",

    events: {
      'click .btn-nav': 'handleNav',
      'click .btn-map-close': 'handleMapClose',
      'click .pos': 'handleClickSVG'
    },

    initialize: function initialize(opt) {
      this.areaCollection = opt.areaCollection || {};
      this.mobCollection = opt.mobCollection || {};

      this.listenTo(this.mobCollection, 'change:killed', this.handleKilled, this);
    },

    /**
     *
     * @param e
     */
    handleNav: function handleNav(e) {

      var href = e.target.getAttribute('data-href');

      window.router.navigate(href, {trigger: true});

    },

    /**
     * Handling click event of map close button
     * @param e
     */
    handleMapClose: function handleMapClose(e) {
      var $btn = $(e.target),
          id = $btn.attr('data-id');
      $('#' + id + '>.container').slideToggle(300, function(e){
          $btn.removeClass('ui-icon-minus ui-icon-plus');
          if( $(this).is(':visible') ) {
            $btn.addClass('ui-icon-minus');
          } else {
            $btn.addClass('ui-icon-plus');
          }

      });
    },

    /** Does this node belong to SVG?
     *  https://github.com/kbwood/svg
     *  @private
     *  @param node {Element} The node to be tested.
     *  @return {boolean} <code>true</code> if an SVG node, <code>false</code> if not. */
    _isSVGElem: function isSVGElem(node) {
      return (node.nodeType === 1 && node.namespaceURI === 'http://www.w3.org/2000/svg');
    },

    /** Retrieve the element classes.
     *  https://github.com/kbwood/svg
     * @private
     * @param elem {Element} The element to examine.
     * @return {string} The class names. */

     _getSVGClassNames:function getSVGClassNames(elem) {
      return (!this._isSVGElem(elem) ? elem.className :
        (elem.className ? elem.className.baseVal : elem.getAttribute('class'))) || '';
    },

    /** Set the element classes.
     *  https://github.com/kbwood/svg
     * @private
     * @param elem {Element} The element to update.
     * @param classes {string} The new class names. */
    _setSVGClassNames: function setSVGClassNames(elem, classes) {
      (elem.className ? elem.className.baseVal = classes : elem.setAttribute('class',  classes));
    },

    /**
     * Handling 'change:killed' event of MobModel.
     * It is executed at the time of change:killed event firing of MobModel.
     *
     * SVG要素はClassNamesがStringではなくSVGAnimatedStringというObjectなので
     * jQueryのclassNamesメソッドが対応していない。
     * ライブラリ（https://github.com/kbwood/svg）を参考にクラスを操作する。
     * http://stackoverflow.com/questions/8638621/jquery-svg-why-cant-i-addclass
     *
     * @param {Backbone.Model} model
     * @param {Boolean} killed
     */
    handleKilled: function handleKilled(model, killed) {
      var self = this,
          cls = 'pos';

      _.each(model.get('pos'), function(pos) {
        var $elm = $('#map-' + model.get('area') + '-' + pos);
        cls = cls + (killed ? ' killed' : '');
        self._setSVGClassNames($elm.get(0), cls);
      });

    },

    handleClickSVG: function handleClickSVG(e) {
      var id = e.target.id.split('-'),
          areaId = Number(id[1]),
          posId =  Number(id[2]),
          self = this,
          cls = 'pos';

      //SVGのareaIDを元に選択されているMobを探す
      _.each(this.mobCollection.where({area: areaId, selected: true}), function(model) {
        //MobModelがクリックされたSVGのposIdを持っていたら
        if (_.indexOf(model.get('pos'), posId) !== -1) {
          //killedをセット
          model.set('killed', !model.get('killed'));
        }
      });
    },

    render: function render() {
      var self = this;

      this.$el.css('visibility','visible');

      this.areaCollection.each(function(areaModel) {
        var $map = $('#map-' + areaModel.get('id')),
            areaId = areaModel.get('id'),
            selectedPos = [];

        if ( !self.mobCollection.selected.area[areaId] ){
          $map.hide();
        } else {
          $map.show();

          _.each(areaModel.get('mobs'), function(mob) {
            var mobModel = self.mobCollection.get(mob);

            _.each(mobModel.get('pos'), function(pos) {
              if ( mobModel.get('selected') || _.indexOf(selectedPos, pos) !== -1) {
                 $('#map-' + areaId + '-' + pos).show();
                 selectedPos.push(pos);
              } else {
                 $('#map-' + areaId + '-' + pos).hide();
              }
            });
          });
        }

      });

    },

    reset: function reset() {
      this.$el.find('.pos:visible').each(function(el) {
        el.hide();
      });
    }

  });

})();
