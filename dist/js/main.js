!function(e){function a(n){if(i[n])return i[n].exports;var t=i[n]={exports:{},id:n,loaded:!1};return e[n].call(t.exports,t,t.exports,a),t.loaded=!0,t.exports}var i={};return a.m=e,a.c=i,a.p="",a(0)}([function(e,a,i){e.exports=i(1)},function(e,a,i){!function(){"use strict";var e=i(2),a=i(14);window.CheckAgent=new a,window.router=new e}()},function(e,a,i){!function(){var a=i(3),n=i(6),t=i(7),s=i(8),o=i(9),l=i(11);i(13);e.exports=Backbone.Router.extend({routes:{"":"homePage",home:"homePage","default":"defaultPage",map:"mapPage"},initialize:function(){this.showHome=!1,this.areaCollection=new o(s.area),this.mobCollection=new l(s.mob),this.homeView=new a({areaCollection:this.areaCollection,mobCollection:this.mobCollection}),this.defaultView=new n({areaCollection:this.areaCollection,mobCollection:this.mobCollection}),this.mapView=new t({areaCollection:this.areaCollection,mobCollection:this.mobCollection}),console.log("Welcome!!"),Backbone.history.start()},homePage:function(){this.homeView.render(),this.showHome=!0,this.defaultView.reset(),this.mapView.reset(),$(":mobile-pagecontainer").pagecontainer("change",this.homeView.$el,{reverse:!0,changeHash:!1})},defaultPage:function(){return this.showHome?(this.defaultView.render(),void $(":mobile-pagecontainer").pagecontainer("change",this.defaultView.$el,{reverse:!1,changeHash:!1})):(this.navigate("",{trigger:!0,replace:!0}),this)},mapPage:function(){return this.showHome?(this.mapView.render(),void $(":mobile-pagecontainer").pagecontainer("change",this.mapView.$el,{reverse:!1,changeHash:!1})):(this.navigate("",{trigger:!0,replace:!0}),this)}})}()},function(e,a,i){!function(){var a=i(4);e.exports=Backbone.View.extend({el:"#home",events:{"click .btn-nav":"handleNav","click .btn-reset":"handleReset","click #btn-help":"handleHelp"},initialize:function(e){this.$arealist=$("#home-arealist"),this.$counter=this.$el.find(".arealist-counter"),this.$resetBtn=this.$el.find(".btn-reset"),this.areaCollection=e.areaCollection||{},this.mobCollection=e.mobCollection||{},this.areaViews=[],this.$navBtns=this.$el.find(".btn-nav"),this.$navBtns.addClass("ui-disabled"),this.listenTo(this.mobCollection,"change:selected",this.handleChangeTargetCount,this)},handleHelp:function(){$("#help-dialog").popup("open")},handleNav:function(e){var a=e.target.getAttribute("data-href");window.router.navigate(a,{trigger:!0})},handleReset:function(){this.mobCollection.each(function(e){e.set("selected",!1)}),_.each(this.areaViews,function(e){e.collapse()})},render:function(){var e=this;return this.$el.css("visibility","visible"),this.areaViews.length||this.areaCollection.each(function(i){var n=new a({model:i,collection:e.mobCollection,selectedOnly:!1});e.areaViews.push(n),e.$arealist.append(n.render().el)},this),this},handleChangeTargetCount:function(){var e=this.mobCollection.selected.total;this.$counter.html("Selected: "+e),this.$resetBtn.toggleClass("ui-disabled",!e),this.$navBtns.toggleClass("ui-disabled",!e)}})}()},function(e,a,i){!function(){var a=i(5);e.exports=Backbone.View.extend({tagName:"div",className:"area",attr:{},template:Handlebars.compile($("#area-template").html()),initialize:function(e){console.log("[initialize] AreaView -- "+this.model.get("name")),this.mobViews=[],this.selectedOnly=e.selectedOnly,this.attr=_.extend(this.attr,e.attr||{})},collapse:function(){this.$el.collapsible("collapse")},render:function(){var e=this.model.toJSON(),a=this.template(e);if(this.selectedOnly&&!this.collection.selected.area[this.model.get("id")])return this;this.$el.html(a).collapsible(this.attr);var i=this.$el.find(".mobs");return this._createMobList(i),i.listview({inset:!1,icon:!1,splitIcon:"action"}),this},_createMobList:function(e){return _.each(this.model.get("mobs"),function(i){var n,t=this.collection.get(i),s=this._getMobPosition(_.first(t.get("pos")));(this.selectedOnly&&t.get("selected")||!self.selectedOnly)&&(n=new a({model:t,posData:self.selectedOnly?s:null,mode:self.selectedOnly?"kill":"check"}),e.append(n.render().$el),this.mobViews.push(n))},this),this},_getMobPosition:function(e){return _.findWhere(this.model.get("pos"),{id:e})},reset:function(){_.each(this.mobViews,function(e){e.remove()}),this.movViews=[]}})}()},function(e,a){!function(){e.exports=Backbone.View.extend({tagName:"li",className:"mob",template:Handlebars.compile($("#mob-template").html()),events:{"click .btn-data":"handleClick"},initialize:function(e){this.mode=e.mode||null,this.posData=e.posData,"check"===this.mode&&this.listenTo(this.model,"change:selected",this.handleSelected,this),"kill"===this.mode&&this.listenTo(this.model,"change:killed",this.handleKilled,this)},render:function(){var e=this.model.toJSON();e.position=this.posData;var a=this.template(e);return this.$el.attr({"data-id":this.model.get("id")}).html(a),"kill"===this.mode&&this.handleKilled(),this},handleSelected:function(){this.$el.find(".btn-data").toggleClass("ui-btn-active ui-icon-check ui-btn-icon-left ui-nodisc-icon",this.model.get("selected"))},handleKilled:function(){this.$el.find(".ui-btn").toggleClass("mob-killed",this.model.get("killed"))},handleClick:function(e){switch(e.preventDefault(),this.mode){case"check":this.model.set("selected",!this.model.get("selected"));break;case"kill":this.model.set("killed",!this.model.get("killed"))}}})}()},function(e,a,i){!function(){var a=i(4);e.exports=Backbone.View.extend({el:"#default",events:{"click .btn-nav":"handleNav"},initialize:function(e){this.$arealist=this.$el.find("#default-arealist"),this.areaCollection=e.areaCollection||{},this.mobCollection=e.mobCollection||{},this.areaViews=[]},handleNav:function(e){var a=e.target.getAttribute("data-href");window.router.navigate(a,{trigger:!0})},render:function(){var e=this;return this.areaViews.length?this:(this.$el.css("visibility","visible"),this.areaCollection.each(function(i){if(e.mobCollection.selected.area[i.get("id")]>0){var n=new a({model:i,collection:e.mobCollection,selectedOnly:!0,attr:{collapsed:!1}});e.areaViews.push(n),e.$arealist.append(n.render().el)}},this),this)},reset:function(){this.areaViews.length&&_.each(this.areaViews,function(e){e.reset(),e.remove()}),this.$arealist.empty(),this.areaViews=[]}})}()},function(e,a){!function(){e.exports=Backbone.View.extend({el:"#map",events:{"click .btn-nav":"handleNav","click .btn-map-close":"handleMapClose","click .pos":"handleClickSVG"},initialize:function(e){this.areaCollection=e.areaCollection||{},this.mobCollection=e.mobCollection||{},this.listenTo(this.mobCollection,"change:killed",this.handleKilled,this)},handleNav:function(e){var a=e.target.getAttribute("data-href");window.router.navigate(a,{trigger:!0})},handleMapClose:function(e){var a=$(e.target),i=a.attr("data-id");$("#"+i+">.container").slideToggle(300,function(e){a.removeClass("ui-icon-minus ui-icon-plus"),$(this).is(":visible")?a.addClass("ui-icon-minus"):a.addClass("ui-icon-plus")})},_isSVGElem:function(e){return 1===e.nodeType&&"http://www.w3.org/2000/svg"===e.namespaceURI},_getSVGClassNames:function(e){return(this._isSVGElem(e)?e.className?e.className.baseVal:e.getAttribute("class"):e.className)||""},_setSVGClassNames:function(e,a){e.className?e.className.baseVal=a:e.setAttribute("class",a)},handleKilled:function(e,a){var i=this,n="pos";_.each(e.get("pos"),function(t){var s=$("#map-"+e.get("area")+"-"+t);n+=a?" killed":"",i._setSVGClassNames(s.get(0),n)})},handleClickSVG:function(e){var a=e.target.id.split("-"),i=Number(a[1]),n=Number(a[2]);_.each(this.mobCollection.where({area:i,selected:!0}),function(e){-1!==_.indexOf(e.get("pos"),n)&&e.set("killed",!e.get("killed"))})},render:function(){var e=this;this.$el.css("visibility","visible"),this.areaCollection.each(function(a){var i=$("#map-"+a.get("id")),n=a.get("id"),t=[];e.mobCollection.selected.area[n]?(i.show(),_.each(a.get("mobs"),function(a){var i=e.mobCollection.get(a);_.each(i.get("pos"),function(e){i.get("selected")||-1!==_.indexOf(t,e)?($("#map-"+n+"-"+e).show(),t.push(e)):$("#map-"+n+"-"+e).hide()})})):i.hide()})},reset:function(){this.$el.find(".pos:visible").each(function(e){e.hide()})}})}()},function(e,a){e.exports={area:[{id:1,name:"クルザス西部高地",pos:[{id:1,name:"リバーズミート",x:29,y:29},{id:2,name:"ハルドラス像",x:31,y:28},{id:3,name:"異端者の坑道",x:33,y:25},{id:4,name:"ナインスヴェアー",x:37,y:27},{id:5,name:"キャンプ・リバーズミート",x:26,y:23},{id:6,name:"金床の塔",x:21,y:27},{id:7,name:"イエティの住処",x:20,y:32},{id:8,name:"レッドリム（東）",x:24,y:31},{id:9,name:"レッドリム（北）",x:21,y:35},{id:10,name:"イエティの住処（洞窟）",x:22,y:36},{id:11,name:"レッドリム（西）",x:16,y:28},{id:12,name:"聖フィネア連隊の露営地",x:15,y:21},{id:13,name:"聖フィネア連隊の露営地（西）",x:13,y:23},{id:14,name:"聖フィネア連隊の露営地（東）",x:18,y:19},{id:15,name:"ブラックアイアン・ブリッジ",x:30,y:20},{id:16,name:"ヘムロック",x:35,y:18},{id:17,name:"オーカム波止場",x:37,y:12},{id:18,name:"オーカム波止場",x:36,y:9},{id:19,name:"ノーススター号",x:31,y:8},{id:20,name:"ゴルガニュ牧草地",x:31,y:12},{id:21,name:"クルザス川",x:24,y:14},{id:22,name:"聖フィネア連隊の露営地（北）",x:15,y:16},{id:23,name:"アッシュプール",x:10,y:17},{id:24,name:"ツインプールズ（西端）",x:9,y:12},{id:25,name:"ドラゴンスピット",x:10,y:6},{id:26,name:"スレート連峰",x:14,y:8},{id:27,name:"ツインプールズ",x:17,y:12},{id:28,name:"ベーンプール",x:19,y:18},{id:29,name:"クルザス川",x:25,y:11}],mobs:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]},{id:2,name:"高地ドラヴァニア",pos:[{id:1,name:"チョコボの森",x:37,y:23},{id:2,name:"つつやき小道",x:38,y:19},{id:3,name:"チョコボの森（北東）",x:33,y:15},{id:4,name:"チョコボの森（離れ）",x:38,y:13},{id:5,name:"餌食の大地",x:31,y:8},{id:6,name:"餌食の大地",x:27,y:8},{id:7,name:"チョコボの森（北西）",x:27,y:13},{id:8,name:"邪竜の彫像",x:25,y:21},{id:9,name:"テイルフェザー西",x:29,y:25},{id:10,name:"スモーキングウェイスト",x:28,y:28},{id:11,name:"スモーキングウェイスト",x:29,y:32},{id:12,name:"グナースの塚",x:28,y:36},{id:13,name:"ウィロームリバー",x:26,y:26},{id:14,name:"ウィロームリバー（下流）",x:21,y:35},{id:15,name:"不浄の集落",x:12,y:39},{id:16,name:"アヴァロニア・フォールン",x:13,y:34},{id:17,name:"ダンナー街道",x:18,y:29},{id:18,name:"不浄の三塔（周辺）",x:18,y:25},{id:19,name:"モーン大岩窟",x:12,y:10},{id:20,name:"ソール・アム山麓",x:19,y:13}],mobs:[26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]},{id:3,name:"ドラヴァニア雲海",pos:[{id:1,name:"モグモグホーム北",x:30,y:32},{id:2,name:"ランロード遺構",x:29,y:28},{id:3,name:"エイル・トーム（モグモグホーム側）",x:33,y:31},{id:4,name:"エイル・トーム（湖周辺）",x:36,y:32},{id:5,name:"エイル・トーム（手紙の家側）",x:36,y:26},{id:6,name:"手紙の家",x:34,y:22},{id:7,name:"モンステリエ",x:33,y:15},{id:8,name:"ランロード遺構",x:26,y:19},{id:9,name:"ランロード遺構",x:25,y:23},{id:10,name:"ランロード遺構",x:21,y:29},{id:11,name:"フォーアームズ",x:18,y:28},{id:12,name:"フォーアームズ",x:14,y:31},{id:13,name:"グリーンスウォード島",x:9,y:36},{id:14,name:"オール・ターン",x:16,y:23},{id:15,name:"飛竜泊",x:20,y:17},{id:16,name:"グロン・レイ",x:11,y:18},{id:17,name:"サウストン・ウォール",x:7,y:19},{id:18,name:"オール・ターン",x:7,y:13},{id:19,name:"ウエストン・ウォーター",x:6,y:8},{id:20,name:"オール・ターン",x:14,y:13},{id:21,name:"サルウーム・カシュ",x:18,y:9},{id:22,name:"イーストン・アイ",x:28,y:10}],mobs:[55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74]},{id:4,name:"アバラシア雲海",pos:[{id:1,name:"ローズハウス付近",x:15,y:36},{id:2,name:"ウィセントヘッド",x:23,y:37},{id:3,name:"ヴール・シアンシラン（霧散の滝）",x:27,y:34},{id:4,name:"ウール・シアンシラン",x:34,y:30},{id:5,name:"渡り鳥の営巣地",x:36,y:37},{id:6,name:"ブンド・オク・ベンド",x:36,y:21},{id:7,name:"オク・ブンド・ヴァナ（白鯨の冠）",x:28,y:22},{id:8,name:"オク・グンド",x:21,y:31},{id:9,name:"ラストステップ",x:14,y:29},{id:10,name:"オク・ブンド・モック",x:17,y:22},{id:11,name:"ブルーウィンドウ",x:6,y:22},{id:12,name:"ブルーウィンドウ",x:6,y:19},{id:13,name:"モローモート周辺",x:12,y:11},{id:14,name:"クロムレック",x:17,y:17},{id:15,name:"オク・ブンド・ヴァナ",x:23,y:19},{id:16,name:"オク・ブンド・ヴァナ",x:30,y:14},{id:17,name:"ブルーウィンドウ",x:24,y:11},{id:18,name:"ブルーウィンドウ",x:18,y:10},{id:19,name:"モック・ウーグル島",x:15,y:7},{id:20,name:"ガントレット諸島",x:21,y:6},{id:21,name:"シャッタードバック",x:29,y:7},{id:22,name:"ネバーリープ入口",x:36,y:9},{id:23,name:"ベネガの坩堝",x:37,y:14},{id:24,name:"クラウドウィンド島",x:7,y:7},{id:25,name:"プロヴェナンス島",x:10,y:25}],mobs:[75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112]},{id:5,name:"低地ドラヴァニア",pos:[{id:1,name:"高地ドラヴァニア入口前",x:38,y:23},{id:2,name:"高地ドラヴァニア入口前",x:36,y:20},{id:3,name:"クルザス西部高地入口前",x:35,y:30},{id:4,name:"ダガー石柱群周辺",x:30,y:25},{id:5,name:"大工房アーキテクトン",x:31,y:22},{id:6,name:"シャーレアン工匠街（創造の道北側）",x:28,y:17},{id:7,name:"シャーレアン工匠街（サリャク河付近）",x:24,y:23},{id:8,name:"シャーレアン選者街",x:19,y:16},{id:9,name:"シャーレアン学士街（黙想の道）",x:13,y:19},{id:10,name:"聖モシャーヌ植物園",x:11,y:24},{id:11,name:"シャーレアン学士街",x:15,y:25},{id:12,name:"シャーレアン学士街（西端）",x:5,y:27},{id:13,name:"クイックスビル・デルタ",x:14,y:31},{id:14,name:"クイックスビル・デルタ（島）",x:17,y:32},{id:15,name:"シャーレアン学士街（アスロン跡）",x:6,y:33},{id:16,name:"シャーレアン哲人街（確信の道）",x:12,y:35},{id:17,name:"シャーレアン哲人街（マトーヤの洞窟）",x:12,y:37},{id:18,name:"シャーレアン哲人街（碩学の道前）",x:20,y:37},{id:19,name:"ゲブラ幻想図書館周辺",x:27,y:37}],mobs:[113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132]},{id:6,name:"アジス・ラー",pos:[{id:1,name:"アルファ管区（クリスタル増殖炉）",x:10,y:14},{id:2,name:"アルファ管区",x:13,y:11},{id:3,name:"アルファ管区",x:13,y:7},{id:4,name:"アルファ管区（第II転送リング）",x:17,y:12},{id:5,name:"アルファ管区（エーテル供給アレイ）",x:18,y:17},{id:6,name:"ベータ管区（第III転送リング）",x:27,y:10},{id:7,name:"ベータ管区",x:30,y:15},{id:8,name:"ベータ管区（突然変異誘発房）",x:30,y:9},{id:9,name:"ベータ管区",x:31,y:13},{id:10,name:"ベータ管区",x:32,y:6},{id:11,name:"ベータ管区",x:35,y:6},{id:12,name:"ベータ管区",x:34,y:9},{id:13,name:"ベータ管区",x:35,y:12},{id:14,name:"ベータ管区（生体培養局）",x:38,y:7},{id:15,name:"ガンマ管区（全域）",x:34,y:26},{id:16,name:"ガンマ管区（飛空戦艦揚陸地点）",x:38,y:24},{id:17,name:"ガンマ管区",x:37,y:28},{id:18,name:"ガンマ管区",x:32,y:27},{id:19,name:"ガンマ管区",x:35,y:31},{id:20,name:"ガンマ管区",x:30,y:30},{id:21,name:"ガンマ管区",x:29,y:28},{id:22,name:"ガンマ管区（第VI転送リング）",x:27,y:33},{id:23,name:"ガンマ管区",x:29,y:35},{id:24,name:"ガンマ管区",x:28,y:38},{id:25,name:"ガンマ管区（カストルム・ソルス）",x:33,y:37},{id:26,name:"ガンマ管区（古代のカテドラル）",x:24,y:28},{id:27,name:"デルタ管区（第VII転送リング）",x:18,y:31},{id:28,name:"デルタ管区",x:15,y:28},{id:29,name:"デルタ管区（対偶の磔刑台）",x:11,y:28},{id:30,name:"デルタ管区",x:8,y:33},{id:31,name:"デルタ管区（ハプスの大樹）",x:6,y:35},{id:32,name:"デルタ管区（デルタ送水局）",x:11,y:37},{id:33,name:"デルタ管区（エシュ・トーム）",x:16,y:35},{id:34,name:"デルタ管区（隔離実験局）",x:9,y:23},{id:35,name:"アルファ管区（超星間交信塔）",x:6,y:16},{id:36,name:"アルファ管区（離島）",x:23,y:8},{id:37,name:"ベータ管区（ハピスフィア）",x:38,y:18},{id:38,name:"アジス・ラー旗艦島",x:22,y:22}],mobs:[133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164]}],mob:[{id:1,lv:50,name:"アイストラップ",pos:[21],area:1,db:"77e1344afda"},{id:2,lv:50,name:"アップランド・ミロドン",pos:[15],area:1,db:"a24c6a38358"},{id:3,lv:50,name:"ゴールドウィンド・バテラー",pos:[20],area:1,db:"b87021b9486"},{id:4,lv:50,name:"シルバーウルフ",pos:[4,17],area:1,db:"39d61ff50d9"},{id:5,lv:50,name:"スタインボック",pos:[1],area:1,db:"a1081e557c6"},{id:6,lv:50,name:"スラッシュゾブラン",pos:[29],area:1,db:"9a62bd0e6f7"},{id:7,lv:50,name:"ディープアイ",pos:[2],area:1,db:"a1857ae0d99"},{id:8,lv:50,name:"フロストグレネード",pos:[20],area:1,db:"7e98f777be0"},{id:9,lv:50,name:"ベルグスルス",pos:[3],area:1,db:"3dd001699ff"},{id:10,lv:51,name:"アイスコマンダー",pos:[24],area:1,db:"47bcf1990fb"},{id:11,lv:51,name:"アルケオーニス",pos:[26,27],area:1,db:"9b107a36f9a"},{id:12,lv:51,name:"ウーリーヤク",pos:[22],area:1,db:"9f2deb55e3e"},{id:13,lv:51,name:"ジェラート",pos:[28],area:1,db:"83d8b1dc8d6"},{id:14,lv:51,name:"ポーラーベアー",pos:[14],area:1},{id:15,lv:51,name:"ルーム",pos:[7,12,24],area:1},{id:16,lv:51,name:"ローン・イエティ",pos:[7,10],area:1},{id:17,lv:56,name:"アイスコマンダー",pos:[25],area:1},{id:18,lv:56,name:"アイスゾブラン",pos:[8,11],area:1},{id:19,lv:56,name:"インランド・トゥルスス",pos:[19],area:1},{id:20,lv:56,name:"ウィンドスルス",pos:[25],area:1},{id:21,lv:56,name:"グランド・アルケオーニス",pos:[16],area:1},{id:22,lv:56,name:"スレート・イエティ",pos:[8,11],area:1},{id:23,lv:56,name:"スリートトラップ",pos:[18],area:1},{id:24,lv:56,name:"ソルベ",pos:[6],area:1},{id:25,lv:56,name:"フリーズドラゴン",pos:[13],area:1},{id:26,lv:51,name:"ロス・カルティベーター",pos:[12],area:2},{id:27,lv:51,name:"ロス・スチールドローン",pos:[12],area:2},{id:28,lv:51,name:"ロス・ファイアドローン",pos:[12],area:2},{id:29,lv:52,name:"グナース・カルディベーター",pos:[12],area:2},{id:30,lv:52,name:"グナース・ファイアドローン",pos:[12],area:2},{id:31,lv:52,name:"ドラゴンフライ・ウォッチャー",pos:[11],area:2},{id:32,lv:52,name:"ドラヴァニアン・エイビス",pos:[8],area:2},{id:33,lv:52,name:"バンダースナッチ",pos:[3],area:2},{id:34,lv:52,name:"フェザーフリー",pos:[2],area:2},{id:35,lv:52,name:"ブラウンベアー",pos:[7],area:2},{id:36,lv:52,name:"メリアエ",pos:[8,9],area:2},{id:37,lv:52,name:"リバー・ニンキナンカ",pos:[13],area:2},{id:38,lv:52,name:"リバー・ナンカ",pos:[13],area:2},{id:39,lv:52,name:"ロフタン",pos:[10],area:2},{id:40,lv:52,name:"ワイルドチョコボ",pos:[1],area:2},{id:41,lv:53,name:"ガッリミムス",pos:[20],area:2},{id:42,lv:53,name:"グナース・フォリジャー",pos:[12],area:2},{id:43,lv:53,name:"グナース・ヘイルドローン",pos:[12],area:2},{id:44,lv:53,name:"グナース・アイアンドローン",pos:[12],area:2},{id:45,lv:53,name:"シリクタ",pos:[19],area:2},{id:46,lv:53,name:"ティラノサウルス",pos:[19],area:2},{id:47,lv:53,name:"ドラヴァニアン・ワイバーン",pos:[16],area:2},{id:48,lv:53,name:"ビネガロン",pos:[19],area:2},{id:49,lv:53,name:"フォーランド・ヒッポセルフ",pos:[18],area:2},{id:50,lv:53,name:"ミアキス",pos:[17],area:2},{id:51,lv:57,name:"ゴールデン・バンダースナッチ",pos:[4,6],area:2},{id:52,lv:57,name:"サンダードラゴン",pos:[5],area:2},{id:53,lv:57,name:"ドラゴンフライ・トレーサー",pos:[5],area:2},{id:54,lv:57,name:"ボーンエイビス",pos:[15],area:2},{id:55,lv:54,name:"アルケオダイノス",pos:[5],area:3},{id:56,lv:54,name:"アンフィプテレ",pos:[12],area:3},{id:57,lv:54,name:"ウアジェット",pos:[8],area:3},{id:58,lv:54,name:"サンクチンニ",pos:[1,2],area:3},{id:59,lv:54,name:"トゥリヘンド",pos:[7],area:3},{id:60,lv:54,name:"モスドラゴン",pos:[9],area:3},{id:61,lv:54,name:"レッサードラゴン",pos:[11],area:3},{id:62,lv:54,name:"ロプケン",pos:[4],area:3},{id:63,lv:55,name:"ヴィーヴル",pos:[15],area:3},{id:64,lv:55,name:"エルダーシリクタ",pos:[6],area:3},{id:65,lv:55,name:"エルダーワイバーン",pos:[10],area:3},{id:66,lv:55,name:"ドラゴネット",pos:[21],area:3},{id:67,lv:55,name:"ナールド・メリアエ",pos:[16],area:3},{id:68,lv:55,name:"ブレード・ビネガロン",pos:[14],area:3},{id:69,lv:55,name:"ミスト・ドレイク",pos:[20],area:3},{id:70,lv:55,name:"ミスト・ビアスト",pos:[3],area:3},{id:71,lv:55,name:"ライムゴーレム",pos:[18],area:3},{id:72,lv:56,name:"ウェアドラゴン",pos:[19],area:3},{id:73,lv:56,name:"クラウドエイビス",pos:[13],area:3},{id:74,lv:56,name:"ブラッドドラゴン",pos:[22],area:3},{id:75,lv:50,name:"オブデラ",pos:[3],area:4},{id:76,lv:50,name:"ガストルニス",pos:[1],area:4},{id:77,lv:50,name:"ゲイラキャット",pos:[1],area:4},{id:78,lv:50,name:"クラウドウォーム",pos:[3],area:4},{id:79,lv:50,name:"コノドント",pos:[3],area:4},{id:80,lv:50,name:"パイッサ",pos:[4],area:4},{id:81,lv:51,name:"ウグライ・グンド",pos:[6],area:4},{id:82,lv:51,name:"サヌワ",pos:[6],area:4},{id:83,lv:51,name:"ナツライ・グンド",pos:[6],area:4},{id:84,lv:51,name:"ランライ・グンド",pos:[6],area:4},{id:85,lv:56,name:"ウィセント",pos:[9],area:4},{id:86,lv:56,name:"ダルメル",pos:[8],area:4},{id:87,lv:56,name:"ワイリー・パイッサ",pos:[9],area:4},{id:88,lv:57,name:"アバラシア・カイト",pos:[11],area:4},{id:89,lv:57,name:"ウィンドウ・ワモーラ",pos:[12],area:4},{id:90,lv:57,name:"ウィンドウ・ワモーラカンパ",pos:[12],area:4},{id:91,lv:57,name:"ウグライ・ブンド",pos:[7,15],area:4},{id:92,lv:57,name:"エンディミオン",pos:[13,18],area:4},{id:93,lv:57,name:"グランズキーパー",pos:[14,17],area:4},{id:94,lv:57,name:"サヌワ・ブンド",pos:[7,15],area:4},{id:95,lv:57,name:"ブンド・トーテム",pos:[14],area:4},{id:96,lv:57,name:"ナツライ・ブンド",pos:[7,15],area:4},{id:97,lv:57,name:"ランライ・ブンド",pos:[7,15],area:4},{id:98,lv:57,name:"VIレギオン・イマギニファー",pos:[16],area:4},{id:99,lv:57,name:"VIレギオン・トリアリウス",pos:[16],area:4},{id:100,lv:57,name:"VIレギオン・ミュルミッロ",pos:[16],area:4},{id:101,lv:57,name:"VIレギオン・ベスティアリウス",pos:[61],area:4},{id:102,lv:57,name:"VIレギオン・ヴェリス",pos:[16],area:4},{id:103,lv:59,name:"アンズー",pos:[5],area:4},{id:104,lv:59,name:"ヴグロイ・ブンド",pos:[10],area:4},{id:105,lv:59,name:"オサヌワ・ブモラ",pos:[10],area:4},{id:106,lv:59,name:"グリフィン",pos:[22],area:4},{id:107,lv:59,name:"コリガン",pos:[8],area:4},{id:108,lv:59,name:"ツィナハレ",pos:[19,25],area:4},{id:109,lv:59,name:"トコトコ",pos:[20,21,23],area:4},{id:110,lv:59,name:"ナツロイ・ブンド",pos:[10],area:4},{id:111,lv:59,name:"モッキンバード・トーテム",pos:[10],area:4},{id:112,lv:59,name:"ランロイ・ブンド",pos:[10],area:4},{id:113,lv:58,name:"オーン・コリブリ",pos:[11,14,15],area:5},{id:114,lv:58,name:"クロウラー",pos:[9],area:5},{id:115,lv:58,name:"ゴブリン・グライダー",pos:[5],area:5},{id:116,lv:58,name:"ゴブリン・シャープシューター",pos:[5],area:5},{id:117,lv:58,name:"ゴブリン・ティンカラー",pos:[5],area:5},{id:118,lv:58,name:"ゴブリン・ブランディッシャー",pos:[5],area:5},{id:119,lv:58,name:"サンベアー",pos:[12],area:5},{id:120,lv:59,name:"サンリーチ",pos:[13],area:5},{id:121,lv:58,name:"ダムゼルフライ",pos:[7],area:5},{id:122,lv:58,name:"タランチュラホーク",pos:[6],area:5},{id:123,lv:58,name:"ナルブルーイ",pos:[1],area:5},{id:124,lv:58,name:"モルボルグレート",pos:[10],area:5},{id:125,lv:58,name:"ラーテル",pos:[4],area:5},{id:126,lv:58,name:"ワイルドビースト",pos:[2],area:5},{id:127,lv:58,name:"III号ゴブリガードE型",pos:[5],area:5},{id:128,lv:59,name:"オーケアニス",pos:[13],area:5},{id:129,lv:59,name:"オプケン",pos:[16],area:5},{id:130,lv:59,name:"コカトリス",pos:[18],area:5},{id:131,lv:59,name:"ピフェリケラス",pos:[19],area:5},{id:132,lv:59,name:"ポロッゴ",pos:[17],area:5},{id:133,lv:59,name:"アラガンワーク・エンジニア",pos:[4],area:6},{id:134,lv:59,name:"アラガン・キマイラ",pos:[10],area:6},{id:135,lv:59,name:"アラガンワーク・ハーベストマン",pos:[3],area:6},{id:136,lv:59,name:"アラガンワーク・パラディン",pos:[4],area:6},{id:137,lv:59,name:"アラガン・ワークビット",pos:[34,35,36,37],area:6},{id:138,lv:59,name:"エンフォースドロイド",pos:[5],area:6},{id:139,lv:59,name:"エンプーサ",pos:[7,8],area:6},{id:140,lv:59,name:"オウルベア",pos:[2],area:6},{id:141,lv:59,name:"コープスフラワー",pos:[8],area:6},{id:142,lv:59,name:"プロトナーガ",pos:[9,11],area:6},{id:143,lv:59,name:"魔導アダマンクロー",pos:[20,22],area:6},{id:144,lv:59,name:"魔導コロッサスIII",pos:[21,26],area:6},{id:145,lv:59,name:"メラシディアン・アンフィプテレ",pos:[27],area:6},{id:146,lv:59,name:"メラシディアン・ヴィーヴル",pos:[32],area:6},{id:147,lv:59,name:"メラシディアン・ドラゴネット",pos:[31],area:6},{id:148,lv:59,name:"メラシディアン・ドラゴン",pos:[29],area:6},{id:149,lv:59,name:"メラシディアン・ファラク",pos:[28],area:6},{id:150,lv:59,name:"メラシディアン・プロビニャク",pos:[30],area:6},{id:151,lv:59,name:"ラミア・サイブリッド",pos:[6],area:6},{id:152,lv:59,name:"ラミア・テリトーク",pos:[6],area:6},{id:153,lv:59,name:"レッサーハイドラ",pos:[35],area:6},{id:154,lv:59,name:"レプトイド",pos:[9,14],area:6},{id:155,lv:59,name:"ルークスナッパー",pos:[1],area:6},{id:156,lv:59,name:"VIレギオン・ビット",pos:[15],area:6},{id:157,lv:59,name:"VIレギオン・シグニフェル",pos:[16,17,25,26],area:6},{id:158,lv:59,name:"VIレギオン・ラクエリウス",pos:[16,17,19,23,25,26],area:6},{id:159,lv:59,name:"VIレギオン・ホプロマクス",pos:[16,18,25],area:6},{id:160,lv:59,name:"VIレギオン・セクトール",pos:[18,25],area:6},{id:161,lv:59,name:"VIレギオン・ヴァンガード",pos:[16,17,19,25,18],area:6},{id:162,lv:59,name:"VIレギオン・エクエス",pos:[17,22,25],area:6},{id:163,lv:60,name:"ウォースバイト",pos:[38],area:6},{id:164,lv:60,name:"スフィンクス",pos:[38],area:6}]}},function(e,a,i){!function(){var a=i(10);e.exports=Backbone.Collection.extend({model:a})}()},function(e,a,i){!function(){i(11);e.exports=Backbone.Model.extend({defaults:{name:"Area",pos:[],mobs:[]},initialize:function(){}})}()},function(e,a,i){!function(){var a=i(12);e.exports=Backbone.Collection.extend({model:a,initialize:function(){this.selected={total:0,area:{1:0,2:0,3:0,4:0,5:0,6:0}},this.on("change:selected",this.handleSelected,this)},handleSelected:function(e){e.get("selected")?(this.selected.total++,this.selected.area[e.get("area")]++):(this.selected.total--,this.selected.area[e.get("area")]--)}})}()},function(e,a){!function(){e.exports=Backbone.Model.extend({defaults:{name:"Mob",area:1,lv:1,pos:[],db:null,selected:!1,killed:!1},initialize:function(){window.CheckAgent.isSmartPhone()&&this.set("db",null)}})}()},function(e,a){!function(){e.exports=Backbone.Model.extend({defaults:{total:0}})}()},function(e,a){!function(){var a=function(){this.result={TYPE:null,OS:null,LANG:window.navigator.language,BROWSER:null,ANDROID:!1,APPLE:!1,SMARTPHONE:!1,DEVICE_NAME:null,VERSION:null},this.ua=window.navigator.userAgent,this.av=window.navigator.appVersion,this._OS(),this._BROWSER(),this._SMARTPHONE()};a.prototype.get=function(){return this.result},a.prototype.isSmartPhone=function(){return this.result.SMARTPHONE},a.prototype._OS=function(){if(-1!==this.ua.indexOf("Android"))this.result.OS="android",this._Android();else if(-1!==this.ua.indexOf("iPhone"))this.result.OS="ios",this.result.DEVICE_NAME="iPhone",this._Apple();else if(-1!==this.ua.indexOf("iPad"))this.result.OS="ios",this.result.DEVICE_NAME="iPad",this._Apple();else if(-1!==this.ua.indexOf("iPod"))this.result.OS="ios",this.result.DEVICE_NAME="iPod",this._Apple();else{var e=this.ua.match(/\((\w+);*/i);this.result.OS=e[1].toLowerCase()}},a.prototype._BROWSER=function(){var e=this.ua.toLowerCase(),a=this.av.toLowerCase();-1!=e.indexOf("msie")?(this.result.BROWSER="ie",-1!=a.indexOf("msie 6.")||-1!=a.indexOf("msie 7.")||-1!=a.indexOf("msie 8.")||-1!=a.indexOf("msie 9.")||-1!=a.indexOf("msie 10.")):-1!=e.indexOf("chrome")?this.result.BROWSER="chrome":-1!=e.indexOf("safari")?this.result.BROWSER="safari":-1!=e.indexOf("firefox")?this.result.BROWSER="firefox":-1!=e.indexOf("opera")&&(this.result.BROWSER="opera")},a.prototype._SMARTPHONE=function(){this.result.SMARTPHONE=(this.result.ANDROID||this.result.APPLE)&&window.innerWidth===screen.width&&window.orientation>=0,this.result.TYPE=this.result.SMARTPHONE?"smartphone":"pc"},a.prototype._Android=function(){var e=this.ua.match(/Android ([\d\.]*);\s([\w\-]+)/i);return this.result.ANDROID=!0,this.result.VERSION=e[1],this.result.DEVICE_NAME=e[2],!0},a.prototype._Apple=function(){var e=this.ua.match(/\((\w+);[\w\s]*?\s[\w\s]+? OS (\d_\d(?:_\d)*)/i);this.result.VERSION=e[2].replace(/_/gi,"."),this.result.APPLE=!0},e.exports=a}()}]);