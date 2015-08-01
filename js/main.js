!function(e){function a(i){if(t[i])return t[i].exports;var n=t[i]={exports:{},id:i,loaded:!1};return e[i].call(n.exports,n,n.exports,a),n.loaded=!0,n.exports}var t={};return a.m=e,a.c=t,a.p="",a(0)}([function(e,a,t){e.exports=t(1)},function(e,a,t){!function(){"use strict";var e=t(2);window.router=new e}()},function(e,a,t){!function(){var a=t(3),i=t(6),n=t(7),o=t(8),l=t(9),s=t(11);t(13);e.exports=Backbone.Router.extend({routes:{"":"homePage",home:"homePage","default":"defaultPage",map:"mapPage"},initialize:function(){this.showHome=!1,this.areaCollection=new l(o.area),this.mobCollection=new s(o.mob),this.homeView=new a({areaCollection:this.areaCollection,mobCollection:this.mobCollection}),this.defaultView=new i({areaCollection:this.areaCollection,mobCollection:this.mobCollection}),this.mapView=new n({areaCollection:this.areaCollection,mobCollection:this.mobCollection}),console.log("Welcome!!"),Backbone.history.start()},homePage:function(){this.homeView.render(),this.showHome=!0,this.defaultView.reset(),this.mapView.reset(),$(":mobile-pagecontainer").pagecontainer("change",this.homeView.$el,{reverse:!0,changeHash:!1})},defaultPage:function(){return this.showHome?(this.defaultView.render(),void $(":mobile-pagecontainer").pagecontainer("change",this.defaultView.$el,{reverse:!1,changeHash:!1})):(this.navigate("",{trigger:!0,replace:!0}),this)},mapPage:function(){return this.showHome?(this.mapView.render(),void $(":mobile-pagecontainer").pagecontainer("change",this.mapView.$el,{reverse:!1,changeHash:!1})):(this.navigate("",{trigger:!0,replace:!0}),this)}})}()},function(e,a,t){!function(){var a=t(4);e.exports=Backbone.View.extend({el:"#home",events:{"click .btn-nav":"handleNav","click .btn-reset":"handleReset","click #btn-help":"handleHelp"},initialize:function(e){this.$arealist=$("#home-arealist"),this.$counter=this.$el.find(".arealist-counter"),this.$resetBtn=this.$el.find(".btn-reset"),this.areaCollection=e.areaCollection||{},this.mobCollection=e.mobCollection||{},this.areaViews=[],this.$navBtns=this.$el.find(".btn-nav"),this.$navBtns.addClass("ui-disabled"),this.listenTo(this.mobCollection,"change:selected",this.handleChangeTargetCount,this)},handleHelp:function(){$("#help-dialog").popup("open")},handleNav:function(e){var a=e.target.getAttribute("data-href");window.router.navigate(a,{trigger:!0})},handleReset:function(){this.mobCollection.each(function(e){e.set("selected",!1)}),_.each(this.areaViews,function(e){e.collapse()});for(var e=1;7>e;e++)$("#map-"+e+">.container").slideDown(0),$("#map-"+e+" .btn-map-close").removeClass("ui-icon-plus ui-icon-minus").addClass("ui-icon-minus")},render:function(){var e=this;return this.$el.css("visibility","visible"),this.areaViews.length||this.areaCollection.each(function(t){var i=new a({model:t,collection:e.mobCollection,selectedOnly:!1});e.areaViews.push(i),e.$arealist.append(i.render().el)},this),this},handleChangeTargetCount:function(){var e=this.mobCollection.selected.total;this.$counter.html("Selected: "+e),this.$resetBtn.toggleClass("ui-disabled",!e),this.$navBtns.toggleClass("ui-disabled",!e)}})}()},function(e,a,t){!function(){var a=t(5);e.exports=Backbone.View.extend({tagName:"div",className:"area",attr:{},template:Handlebars.compile($("#area-template").html()),initialize:function(e){console.log("[initialize] AreaView -- "+this.model.get("name")),this.mobViews=[],this.selectedOnly=e.selectedOnly,this.attr=_.extend(this.attr,e.attr||{})},collapse:function(){this.$el.collapsible("collapse")},render:function(){var e=this,t=this.model.toJSON(),i=this.template(t);if(this.selectedOnly&&!this.collection.selected.area[this.model.get("id")])return this;this.$el.html(i).collapsible(this.attr);var n=this.$el.find(".mobs");return n.listview({inset:!1}),_.each(this.model.get("mobs"),function(t){var i,o=this.collection.get(t),l=this._getMobPosition(_.first(o.get("pos")));(this.selectedOnly&&o.get("selected")||!e.selectedOnly)&&(i=new a({model:o,posData:e.selectedOnly?l:null,mode:e.selectedOnly?"kill":"check"}),n.append(i.render().$el),this.mobViews.push(i))},this),this},_getMobPosition:function(e){return _.findWhere(this.model.get("pos"),{id:e})},reset:function(){_.each(this.mobViews,function(e){e.remove()}),this.movViews=[]}})}()},function(e,a){!function(){e.exports=Backbone.View.extend({tagName:"li",className:"mob",template:Handlebars.compile($("#mob-template").html()),events:{click:"handleClick"},initialize:function(e){this.mode=e.mode||null,this.posData=e.posData,"check"===this.mode&&this.listenTo(this.model,"change:selected",this.handleSelected,this),"kill"===this.mode&&this.listenTo(this.model,"change:killed",this.handleKilled,this)},render:function(){var e=this.model.toJSON();e.position=this.posData;var a=this.template(e);return this.$el.attr({"data-id":this.model.get("id")}).html(a),"kill"===this.mode&&this.handleKilled(),this},handleSelected:function(){this.$el.find(".ui-btn").toggleClass("ui-btn-active ui-icon-check ui-btn-icon-left ui-nodisc-icon",this.model.get("selected"))},handleKilled:function(){this.$el.find(".ui-btn").toggleClass("mob-killed",this.model.get("killed"))},handleClick:function(){switch(this.mode){case"check":this.model.set("selected",!this.model.get("selected"));break;case"kill":this.model.set("killed",!this.model.get("killed"))}}})}()},function(e,a,t){!function(){var a=t(4);e.exports=Backbone.View.extend({el:"#default",events:{"click .btn-nav":"handleNav"},initialize:function(e){this.$arealist=this.$el.find("#default-arealist"),this.areaCollection=e.areaCollection||{},this.mobCollection=e.mobCollection||{},this.areaViews=[]},handleNav:function(e){var a=e.target.getAttribute("data-href");window.router.navigate(a,{trigger:!0})},render:function(){var e=this;return this.areaViews.length?this:(this.$el.css("visibility","visible"),this.areaCollection.each(function(t){if(e.mobCollection.selected.area[t.get("id")]>0){var i=new a({model:t,collection:e.mobCollection,selectedOnly:!0,attr:{collapsed:!1}});e.areaViews.push(i),e.$arealist.append(i.render().el)}},this),this)},reset:function(){this.areaViews.length&&_.each(this.areaViews,function(e){e.reset(),e.remove()}),this.$arealist.empty(),this.areaViews=[]}})}()},function(e,a){!function(){e.exports=Backbone.View.extend({el:"#map",events:{"click .btn-nav":"handleNav","click .btn-map-close":"handleMapClose","click .pos":"handleClickSVG","click .btn-toggle-location":"handleClickLocation"},initialize:function(e){this.areaCollection=e.areaCollection||{},this.mobCollection=e.mobCollection||{},this.listenTo(this.mobCollection,"change:killed",this.handleKilled,this)},handleNav:function(e){var a=e.target.getAttribute("data-href");window.router.navigate(a,{trigger:!0})},handleMapClose:function(e){var a=$(e.target),t=a.attr("data-id");$("#"+t+">.container").slideToggle(300,function(e){a.removeClass("ui-icon-minus ui-icon-plus"),$(this).is(":visible")?a.addClass("ui-icon-minus"):a.addClass("ui-icon-plus")})},handleClickLocation:function(e){e.preventDefault(),$(".map-text").each(function(){$(this).toggle()})},_isSVGElem:function(e){return 1===e.nodeType&&"http://www.w3.org/2000/svg"===e.namespaceURI},_getSVGClassNames:function(e){return(this._isSVGElem(e)?e.className?e.className.baseVal:e.getAttribute("class"):e.className)||""},_setSVGClassNames:function(e,a){e.className?e.className.baseVal=a:e.setAttribute("class",a)},handleKilled:function(e,a){var t=this,i="pos";_.each(e.get("pos"),function(n){var o=$("#map-"+e.get("area")+"-"+n);i+=a?" killed":"",t._setSVGClassNames(o.get(0),i)})},handleClickSVG:function(e){var a=e.target.id.split("-"),t=Number(a[1]),i=Number(a[2]);_.each(this.mobCollection.where({area:t,selected:!0}),function(e){-1!==_.indexOf(e.get("pos"),i)&&e.set("killed",!e.get("killed"))})},render:function(){var e=this;this.$el.css("visibility","visible"),this.areaCollection.each(function(a){var t=$("#map-"+a.get("id")),i=a.get("id"),n=[];t.find(".map-mobname").empty(),e.mobCollection.selected.area[i]?(t.show(),_.each(a.get("mobs"),function(o){var l=e.mobCollection.get(o),s=a.get("pos");_.each(l.get("pos"),function(e){var a=$("#map-"+i+"-"+e);if(!l.get("selected"))return void(-1===_.indexOf(n,e)&&a.hide());var o,d=_.findWhere(s,{id:e});-1===_.indexOf(n,e)?(a.show(),n.push(e),o=$('<div class="names name-'+i+"-"+e+'"></div>').css({top:d.top,left:d.left,"min-width":d.w,"min-height":d.h}),t.find(".map-mobname").append(o)):o=$(".name-"+i+"-"+e);var m=$("<p>"+l.get("name")+"</p>").attr({"class":"mob-"+i+"-"+e+"_"+l.get("id"),"data-id":l.get("id")});o.append(m)})})):t.hide()})},reset:function(){this.$el.find(".pos:visible").each(function(e){e.hide()}),$(".map-mobname").each(function(){$(this).empty()})}})}()},function(e,a){e.exports={area:[{id:1,name:"クルザス西部高地",pos:[{id:1,name:"リバーズミート",x:29,y:29,top:319,left:330,w:114,h:169},{id:2,name:"ハルドラス像",x:31,y:28,top:344,left:363,w:87,h:83},{id:3,name:"異端者の坑道",x:33,y:25,top:297,left:414,w:56,h:56},{id:4,name:"ナインスヴェアー",x:37,y:27,top:316,left:476,w:51,h:53},{id:5,name:"キャンプ・リバーズミート",x:26,y:23,top:286,left:276,w:121,h:54},{id:6,name:"金床の塔",x:21,y:27,top:340,left:274,w:52,h:52},{id:7,name:"イエティの住処",x:20,y:32,top:366,left:227,w:59,h:92},{id:8,name:"レッドリム（東）",x:24,y:31,top:384,left:287,w:61,h:61},{id:9,name:"レッドリム（北）",x:21,y:35,top:436,left:236,w:66,h:53},{id:10,name:"イエティの住処（洞窟）",x:22,y:36,top:458,left:277,w:34,h:36},{id:11,name:"レッドリム（西）",x:16,y:28,top:327,left:174,w:70,h:107},{id:12,name:"聖フィネア連隊の露営地",x:15,y:21,top:249,left:188,w:69,h:95},{id:13,name:"聖フィネア連隊の露営地（西）",x:13,y:23,top:264,left:134,w:62,h:64},{id:14,name:"聖フィネア連隊の露営地（東）",x:18,y:19,top:239,left:244,w:56,h:59},{id:15,name:"ブラックアイアン・ブリッジ",x:30,y:20,top:170,left:318,w:126,h:128},{id:16,name:"ヘムロック",x:35,y:18,top:203,left:443,w:56,h:77},{id:17,name:"オーカム波止場",x:37,y:12,top:130,left:453,w:62,h:67},{id:18,name:"オーカム波止場",x:36,y:9,top:78,left:456,w:45,h:54},{id:19,name:"ノーススター号",x:31,y:8,top:50,left:348,w:113,h:69},{id:20,name:"ゴルガニュ牧草地",x:31,y:12,top:120,left:358,w:103,h:72},{id:21,name:"クルザス川",x:24,y:14,top:152,left:294,w:77,h:102},{id:22,name:"聖フィネア連隊の露営地（北）",x:15,y:16,top:185,left:180,w:110,h:57},{id:23,name:"アッシュプール",x:10,y:17,top:204,left:104,w:50,h:65},{id:24,name:"ツインプールズ（西端）",x:9,y:12,top:131,left:59,w:90,h:81},{id:25,name:"ドラゴンスピット",x:10,y:6,top:83,left:91,w:65,h:59},{id:26,name:"スレート連峰",x:14,y:8,top:60,left:151,w:59,h:63},{id:27,name:"ツインプールズ",x:17,y:12,top:117,left:151,w:154,h:74},{id:28,name:"ベーンプール",x:19,y:18,top:84,left:219,w:85,h:36},{id:29,name:"クルザス川",x:25,y:11,top:102,left:304,w:53,h:50}],mobs:[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25]},{id:2,name:"高地ドラヴァニア",pos:[{id:1,name:"チョコボの森",x:37,y:23,top:201,left:439,w:104,h:193},{id:2,name:"つつやき小道",x:38,y:19,top:221,left:466,w:70,h:70},{id:3,name:"チョコボの森（北東）",x:33,y:15,top:143,left:393,w:83,h:113},{id:4,name:"チョコボの森（離れ）",x:38,y:13,top:131,left:479,w:53,h:52},{id:5,name:"餌食の大地",x:31,y:8,top:37,left:382,w:96,h:90},{id:6,name:"餌食の大地",x:27,y:8,top:76,left:333,w:52,h:53},{id:7,name:"チョコボの森（北西）",x:27,y:13,top:134,left:318,w:86,h:90},{id:8,name:"邪竜の彫像",x:25,y:21,top:238,left:292,w:91,h:91},{id:9,name:"テイルフェザー西",x:29,y:25,top:299,left:353,w:61,h:61},{id:10,name:"スモーキングウェイスト",x:28,y:28,top:339,left:334,w:69,h:84},{id:11,name:"スモーキングウェイスト",x:29,y:32,top:394,left:359,w:53,h:51},{id:12,name:"グナースの塚",x:28,y:36,top:446,left:316,w:121,h:108},{id:13,name:"ウィロームリバー",x:26,y:26,top:326,left:281,w:77,h:113},{id:14,name:"ウィロームリバー（下流）",x:21,y:35,top:441,left:235,w:56,h:56},{id:15,name:"不浄の集落",x:12,y:39,top:485,left:127,w:47,h:47},{id:16,name:"アヴァロニア・フォールン",x:13,y:34,top:409,left:75,w:161,h:77},{id:17,name:"ダンナー街道",x:18,y:29,top:357,left:197,w:75,h:75},{id:18,name:"不浄の三塔（周辺）",x:18,y:25,top:240,left:142,w:152,h:138},{id:19,name:"モーン大岩窟",x:12,y:10,top:100,left:122,w:91,h:180},{id:20,name:"ソール・アム山麓",x:19,y:13,top:76,left:224,w:94,h:92}],mobs:[26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54]},{id:3,name:"ドラヴァニア雲海",pos:[{id:1,name:"モグモグホーム北",x:30,y:32,top:400,left:330,w:144,h:72},{id:2,name:"ランロード遺構",x:29,y:28,top:361,left:357,w:63,h:60},{id:3,name:"エイル・トーム（モグモグホーム側）",x:33,y:31,top:373,left:401,w:67,h:67},{id:4,name:"エイル・トーム（湖周辺）",x:36,y:32,top:355,left:436,w:87,h:109},{id:5,name:"エイル・トーム（手紙の家側）",x:36,y:26,top:299,left:359,w:165,h:75},{id:6,name:"手紙の家",x:34,y:22,top:242,left:421,w:69,h:79},{id:7,name:"モンステリエ",x:33,y:15,top:162,left:409,w:71,h:65},{id:8,name:"ランロード遺構",x:26,y:19,top:206,left:296,w:97,h:81},{id:9,name:"ランロード遺構",x:25,y:23,top:265,left:263,w:91,h:77},{id:10,name:"ランロード遺構",x:21,y:29,top:336,left:245,w:114,h:90},{id:11,name:"フォーアームズ",x:18,y:28,top:342,left:178,w:76,h:76},{id:12,name:"フォーアームズ",x:14,y:31,top:382,left:137,w:113,h:79},{id:13,name:"グリーンスウォード島",x:9,y:36,top:441,left:76,w:84,h:84},{id:14,name:"オール・ターン",x:16,y:23,top:259,left:144,w:127,h:92},{id:15,name:"飛竜泊",x:20,y:17,top:181,left:225,w:76,h:76},{id:16,name:"グロン・レイ",x:11,y:18,top:220,left:104,w:134,h:57},{id:17,name:"サウストン・ウォール",x:7,y:19,top:218,left:60,w:60,h:60},{id:18,name:"オール・ターン",x:7,y:13,top:131,left:51,w:75,h:75},{id:19,name:"ウエストン・ウォーター",x:6,y:8,top:74,left:59,w:93,h:60},{id:20,name:"オール・ターン",x:14,y:13,top:146,left:98,w:125,h:84},{id:21,name:"サルウーム・カシュ",x:18,y:9,top:84,left:197,w:90,h:90},{id:22,name:"イーストン・アイ",x:28,y:10,top:69,left:296,w:87,h:87}],mobs:[55,56,57,58,59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74]},{id:4,name:"アバラシア雲海",pos:[{id:1,name:"ローズハウス付近",x:15,y:36,top:434,left:155,w:118,h:87},{id:2,name:"ウィセントヘッド",x:23,y:37,top:468,left:241,w:119,h:67},{id:3,name:"ヴール・シアンシラン（霧散の滝）",x:27,y:34,top:377,left:310,w:128,h:125},{id:4,name:"ウール・シアンシラン",x:34,y:30,top:377,left:310,w:99,h:95},{id:5,name:"渡り鳥の営巣地",x:36,y:37,top:349,left:407,w:87,h:87},{id:6,name:"ブンド・オク・ベンド",x:36,y:21,top:444,left:447,w:97,h:97},{id:7,name:"オク・ブンド・ヴァナ（白鯨の冠）",x:28,y:22,top:230,left:436,w:111,h:133},{id:8,name:"オク・グンド",x:21,y:31,top:224,left:308,w:120,h:89},{id:9,name:"ラストステップ",x:14,y:29,top:353,left:133,w:89,h:89},{id:10,name:"オク・ブンド・モック",x:17,y:22,top:249,left:145,w:143,h:106},{id:11,name:"ブルーウィンドウ",x:6,y:22,top:266,left:45,w:61,h:61},{id:12,name:"ブルーウィンドウ",x:6,y:19,top:208,left:45,w:92,h:71},{id:13,name:"モローモート周辺",x:12,y:11,top:99,left:121,w:79,h:79},{id:14,name:"クロムレック",x:17,y:17,top:157,left:170,w:93,h:92},{id:15,name:"オク・ブンド・ヴァナ",x:23,y:19,top:181,left:263,w:101,h:98},{id:16,name:"オク・ブンド・ヴァナ",x:30,y:14,top:156,left:386,w:45,h:45},{id:17,name:"ブルーウィンドウ",x:24,y:11,top:108,left:259,w:86,h:76},{id:18,name:"ブルーウィンドウ",x:18,y:10,top:87,left:206,w:63,h:65},{id:19,name:"モック・ウーグル島",x:15,y:7,top:43,left:165,w:86,h:67},{id:20,name:"ガントレット諸島",x:21,y:6,top:40,left:251,w:102,h:68},{id:21,name:"シャッタードバック",x:29,y:7,top:53,left:362,w:79,h:52},{id:22,name:"ネバーリープ入口",x:36,y:9,top:75,left:425,w:98,h:79},{id:23,name:"ベネガの坩堝",x:37,y:14,top:152,left:462,w:57,h:57},{id:24,name:"クラウドウィンド島",x:7,y:7,top:52,left:55,w:71,h:71},{id:25,name:"プロヴェナンス島",x:10,y:25,top:309,left:106,w:45,h:45}],mobs:[75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112]},{id:5,name:"低地ドラヴァニア",pos:[{id:1,name:"高地ドラヴァニア入口前",x:38,y:23,top:288,left:447,w:84,h:94},{id:2,name:"高地ドラヴァニア入口前",x:36,y:20,top:238,left:446,w:82,h:168},{id:3,name:"クルザス西部高地入口前",x:35,y:30,top:382,left:396,w:101,h:42},{id:4,name:"ダガー石柱群周辺",x:30,y:25,top:312,left:342,w:112,h:72},{id:5,name:"大工房アーキテクトン",x:31,y:22,top:255,left:373,w:80,h:78},{id:6,name:"シャーレアン工匠街（創造の道北側）",x:28,y:17,top:205,left:321,w:119,h:49},{id:7,name:"シャーレアン工匠街（サリャク河付近）",x:24,y:23,top:243,left:305,w:50,h:105},{id:8,name:"シャーレアン選者街",x:19,y:16,top:142,left:207,w:107,h:107},{id:9,name:"シャーレアン学士街（黙想の道）",x:13,y:19,top:188,left:112,w:113,h:139},{id:10,name:"聖モシャーヌ植物園",x:11,y:24,top:277,left:103,w:69,h:69},{id:11,name:"シャーレアン学士街",x:15,y:25,top:307,left:134,w:104,h:85},{id:12,name:"シャーレアン学士街（西端）",x:5,y:27,top:245,left:45,w:70,h:174},{id:13,name:"クイックスビル・デルタ",x:14,y:31,top:381,left:102,w:124,h:76},{id:14,name:"クイックスビル・デルタ（島）",x:17,y:32,top:392,left:192,w:50,h:51},{id:15,name:"シャーレアン学士街（アスロン跡）",x:6,y:33,top:417,left:46,w:52,h:52},{id:16,name:"シャーレアン哲人街（確信の道）",x:12,y:35,top:414,left:97,w:127,h:121},{id:17,name:"シャーレアン哲人街（マトーヤの洞窟）",x:12,y:37,top:414,left:97,w:127,h:121},{id:18,name:"シャーレアン哲人街（碩学の道前）",x:20,y:37,top:428,left:213,w:66,h:104},{id:19,name:"ゲブラ幻想図書館周辺",x:27,y:37,top:365,left:319,w:80,h:177}],mobs:[113,114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132]},{id:6,name:"アジス・ラー",pos:[{id:1,name:"アルファ管区（クリスタル増殖炉）",x:10,y:14,top:153,left:115,w:86,h:51},{id:2,name:"アルファ管区",x:13,y:11,top:62,left:114,w:164,h:150},{id:3,name:"アルファ管区",x:13,y:7,top:80,left:151,w:54,h:54},{id:4,name:"アルファ管区（第II転送リング）",x:17,y:12,top:134,left:184,w:69,h:63},{id:5,name:"アルファ管区（エーテル供給アレイ）",x:18,y:17,top:178,left:133,w:143,h:80},{id:6,name:"ベータ管区（第III転送リング）",x:27,y:10,top:79,left:337,w:57,h:118},{id:7,name:"ベータ管区",x:30,y:15,top:177,left:371,w:42,h:42},{id:8,name:"ベータ管区（突然変異誘発房）",x:30,y:9,top:100,left:373,w:68,h:71},{id:9,name:"ベータ管区",x:31,y:13,top:158,left:402,w:48,h:48},{id:10,name:"ベータ管区",x:32,y:6,top:49,left:372,w:75,h:53},{id:11,name:"ベータ管区",x:35,y:6,top:56,left:446,w:39,h:39},{id:12,name:"ベータ管区",x:34,y:9,top:82,left:435,w:56,h:56},{id:13,name:"ベータ管区",x:35,y:12,top:136,left:452,w:39,h:39},{id:14,name:"ベータ管区（生体培養局）",x:38,y:7,top:45,left:486,w:47,h:128},{id:15,name:"ガンマ管区（全域）",x:34,y:26,top:283,left:344,w:190,h:259},{id:16,name:"ガンマ管区（飛空戦艦揚陸地点）",x:38,y:24,top:285,left:444,w:101,h:75},{id:17,name:"ガンマ管区",x:37,y:28,top:349,left:456,w:58,h:58},{id:18,name:"ガンマ管区",x:32,y:27,top:344,left:413,w:35,h:35},{id:19,name:"ガンマ管区",x:35,y:31,top:388,left:441,w:44,h:44},{id:20,name:"ガンマ管区",x:30,y:30,top:366,left:379,w:52,h:52},{id:21,name:"ガンマ管区",x:29,y:28,top:367,left:366,w:36,h:34},{id:22,name:"ガンマ管区（第VI転送リング）",x:27,y:33,top:410,left:347,w:41,h:41},{id:23,name:"ガンマ管区",x:29,y:35,top:439,left:373,w:37,h:37},{id:24,name:"ガンマ管区",x:28,y:38,top:483,left:347,w:44,h:44},{id:25,name:"ガンマ管区（カストルム・ソルス）",x:33,y:37,top:418,left:379,w:130,h:133},{id:26,name:"ガンマ管区（古代のカテドラル）",x:24,y:28,top:354,left:296,w:48,h:48},{id:27,name:"デルタ管区（第VII転送リング）",x:18,y:31,top:385,left:213,w:45,h:45},{id:28,name:"デルタ管区",x:15,y:28,top:356,left:176,w:44,h:64},{id:29,name:"デルタ管区（対偶の磔刑台）",x:11,y:28,top:321,left:84,w:96,h:96},{id:30,name:"デルタ管区",x:8,y:33,top:376,left:70,w:77,h:97},{id:31,name:"デルタ管区（ハプスの大樹）",x:6,y:35,top:428,left:52,w:66,h:66},{id:32,name:"デルタ管区（デルタ送水局）",x:11,y:37,top:464,left:78,w:112,h:55},{id:33,name:"デルタ管区（エシュ・トーム）",x:16,y:35,top:432,left:135,w:98,h:57},{id:34,name:"デルタ管区（隔離実験局）",x:9,y:23,top:295,left:107,w:27,h:26},{id:35,name:"アルファ管区（超星間交信塔）",x:6,y:16,top:173,left:46,w:69,h:69},{id:36,name:"アルファ管区（離島）",x:23,y:8,top:49,left:264,w:75,h:85},{id:37,name:"ベータ管区（ハピスフィア）",x:38,y:18,top:172,left:443,w:99,h:93},{id:38,name:"アジス・ラー旗艦島",x:22,y:22,top:249,left:190,w:198,h:86}],mobs:[133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164]}],mob:[{id:1,lv:50,name:"アイストラップ",pos:[21],area:1},{id:2,lv:50,name:"アップランド・ミロドン",pos:[15],area:1},{id:3,lv:50,name:"ゴールドウィンド・バテラー",pos:[20],area:1},{id:4,lv:50,name:"シルバーウルフ",pos:[4,17],area:1},{id:5,lv:50,name:"スタインボック",pos:[1],area:1,difficulty:1},{id:6,lv:50,name:"スラッシュゾブラン",pos:[29],area:1},{id:7,lv:50,name:"ディープアイ",pos:[2],area:1},{id:8,lv:50,name:"フロストグレネード",pos:[20],area:1},{id:9,lv:50,name:"ベルグスルス",pos:[3],area:1},{id:10,lv:51,name:"アイスコマンダー",pos:[24],area:1},{id:11,lv:51,name:"アルケオーニス",pos:[26,27],area:1},{id:12,lv:51,name:"ウーリーヤク",pos:[22],area:1},{id:13,lv:51,name:"ジェラート",pos:[28],area:1},{id:14,lv:51,name:"ポーラーベアー",pos:[14],area:1},{id:15,lv:51,name:"ルーム",pos:[7,12,24],area:1},{id:16,lv:51,name:"ローン・イエティ",pos:[7,10],area:1},{id:17,lv:56,name:"アイスコマンダー",pos:[25],area:1},{id:18,lv:56,name:"アイスゾブラン",pos:[8,11],area:1},{id:19,lv:56,name:"インランド・トゥルスス",pos:[19],area:1},{id:20,lv:56,name:"ウィンドスルス",pos:[25],area:1},{id:21,lv:56,name:"グランド・アルケオーニス",pos:[16],area:1},{id:22,lv:56,name:"スレート・イエティ",pos:[8,11],area:1},{id:23,lv:56,name:"スリートトラップ",pos:[18],area:1},{id:24,lv:56,name:"ソルベ",pos:[6],area:1},{id:25,lv:56,name:"フリーズドラゴン",pos:[13],area:1},{id:26,lv:51,name:"ロス・カルティベーター",pos:[12],area:2},{id:27,lv:51,name:"ロス・スチールドローン",pos:[12],area:2},{id:28,lv:51,name:"ロス・ファイアドローン",pos:[12],area:2},{id:29,lv:52,name:"グナース・カルディベーター",pos:[12],area:2},{id:30,lv:52,name:"グナース・ファイアドローン",pos:[12],area:2},{id:31,lv:52,name:"ドラゴンフライ・ウォッチャー",pos:[11],area:2},{id:32,lv:52,name:"ドラヴァニアン・エイビス",pos:[8],area:2},{id:33,lv:52,name:"バンダースナッチ",pos:[3],area:2},{id:34,lv:52,name:"フェザーフリー",pos:[2],area:2},{id:35,lv:52,name:"ブラウンベアー",pos:[7],area:2},{id:36,lv:52,name:"メリアエ",pos:[8,9],area:2},{id:37,lv:52,name:"リバー・ニンキナンカ",pos:[13],area:2},{id:38,lv:52,name:"リバー・ナンカ",pos:[13],area:2},{id:39,lv:52,name:"ロフタン",pos:[10],area:2},{id:40,lv:52,name:"ワイルドチョコボ",pos:[1],area:2},{id:41,lv:53,name:"ガッリミムス",pos:[20],area:2},{id:42,lv:53,name:"グナース・フォリジャー",pos:[12],area:2},{id:43,lv:53,name:"グナース・ヘイルドローン",pos:[12],area:2},{id:44,lv:53,name:"グナース・アイアンドローン",pos:[12],area:2},{id:45,lv:53,name:"シリクタ",pos:[19],area:2},{id:46,lv:53,name:"ティラノサウルス",pos:[19],area:2},{id:47,lv:53,name:"ドラヴァニアン・ワイバーン",pos:[16],area:2},{id:48,lv:53,name:"ビネガロン",pos:[19],area:2},{id:49,lv:53,name:"フォーランド・ヒッポセルフ",pos:[18],area:2},{id:50,lv:53,name:"ミアキス",pos:[17],area:2},{id:51,lv:57,name:"ゴールデン・バンダースナッチ",pos:[4,6],area:2},{id:52,lv:57,name:"サンダードラゴン",pos:[5],area:2},{id:53,lv:57,name:"ドラゴンフライ・トレーサー",pos:[5],area:2},{id:54,lv:57,name:"ボーンエイビス",pos:[15],area:2},{id:55,lv:54,name:"アルケオダイノス",pos:[5],area:3},{id:56,lv:54,name:"アンフィプテレ",pos:[12],area:3},{id:57,lv:54,name:"ウアジェット",pos:[8],area:3},{id:58,lv:54,name:"サンクチンニ",pos:[1,2],area:3},{id:59,lv:54,name:"トゥリヘンド",pos:[7],area:3},{id:60,lv:54,name:"モスドラゴン",pos:[9],area:3},{id:61,lv:54,name:"レッサードラゴン",pos:[11],area:3},{id:62,lv:54,name:"ロプケン",pos:[4],area:3},{id:63,lv:55,name:"ヴィーヴル",pos:[15],area:3},{id:64,lv:55,name:"エルダーシリクタ",pos:[6],area:3},{id:65,lv:55,name:"エルダーワイバーン",pos:[10],area:3},{id:66,lv:55,name:"ドラゴネット",pos:[21],area:3},{id:67,lv:55,name:"ナールド・メリアエ",pos:[16],area:3},{id:68,lv:55,name:"ブレード・ビネガロン",pos:[14],area:3},{id:69,lv:55,name:"ミスト・ドレイク",pos:[20],area:3},{id:70,lv:55,name:"ミスト・ビアスト",pos:[3],area:3},{id:71,lv:55,name:"ライム・ゴーレム",pos:[18],area:3},{id:72,lv:56,name:"ウェアドラゴン",pos:[19],area:3},{id:73,lv:56,name:"クラウドエイビス",pos:[13],area:3},{id:74,lv:56,name:"ブラッドドラゴン",pos:[22],area:3},{id:75,lv:50,name:"オブデラ",pos:[3],area:4},{id:76,lv:50,name:"ガストルニス",pos:[1],area:4},{id:77,lv:50,name:"ゲイラキャット",pos:[1],area:4},{id:78,lv:50,name:"クラウドウォーム",pos:[3],area:4},{id:79,lv:50,name:"コノドント",pos:[3],area:4},{id:80,lv:50,name:"パイッサ",pos:[4],area:4},{id:81,lv:51,name:"ウグライ・グンド",pos:[6],area:4},{id:82,lv:51,name:"サヌワ",pos:[6],area:4},{id:83,lv:51,name:"ナツライ・グンド",pos:[6],area:4},{id:84,lv:51,name:"ランライ・グンド",pos:[6],area:4},{id:85,lv:56,name:"ウィセント",pos:[9],area:4},{id:86,lv:56,name:"ダルメル",pos:[8],area:4},{id:87,lv:56,name:"ワイリー・パイッサ",pos:[9],area:4},{id:88,lv:57,name:"アバラシア・カイト",pos:[11],area:4},{id:89,lv:57,name:"ウィンドウ・ワモーラ",pos:[12],area:4},{id:90,lv:57,name:"ウィンドウ・ワモーラカンパ",pos:[12],area:4},{id:91,lv:57,name:"ウグライ・ブンド",pos:[7,15],area:4},{id:92,lv:57,name:"エンディミオン",pos:[13,18],area:4},{id:93,lv:57,name:"グランズキーパー",pos:[14,17],area:4},{id:94,lv:57,name:"サヌワ・ブンド",pos:[7,15],area:4},{id:95,lv:57,name:"ブンド・トーテム",pos:[14],area:4},{id:96,lv:57,name:"ナツライ・ブンド",pos:[7,15],area:4},{id:97,lv:57,name:"ランライ・ブンド",pos:[7,15],area:4},{id:98,lv:57,name:"VIレギオン・イマギニファー",pos:[16],area:4},{id:99,lv:57,name:"VIレギオン・トリアリウス",pos:[16],area:4},{id:100,lv:57,name:"VIレギオン・ミュルミッロ",pos:[16],area:4},{id:101,lv:57,name:"VIレギオン・ベスティアリウス",pos:[61],area:4},{id:102,lv:57,name:"VIレギオン・ヴェリス",pos:[16],area:4},{id:103,lv:59,name:"アンズー",pos:[5],area:4},{id:104,lv:59,name:"ヴグロイ・ブンド",pos:[10],area:4},{id:105,lv:59,name:"オサヌワ・ブモラ",pos:[10],area:4},{id:106,lv:59,name:"グリフィン",pos:[22],area:4},{id:107,lv:59,name:"コリガン",pos:[8],area:4},{id:108,lv:59,name:"ツィナハレ",pos:[19,25],area:4},{id:109,lv:59,name:"トコトコ",pos:[20,21,23],area:4},{id:110,lv:59,name:"ナツロイ・ブンド",pos:[10],area:4},{id:111,lv:59,name:"モッキンバード・トーテム",pos:[10],area:4},{id:112,lv:59,name:"ランロイ・ブンド",pos:[10],area:4},{id:113,lv:58,name:"オーン・コリブリ",pos:[11,14,15],area:5},{id:114,lv:58,name:"クロウラー",pos:[9],area:5},{id:115,lv:58,name:"ゴブリン・グライダー",pos:[5],area:5},{id:116,lv:58,name:"ゴブリン・シャープシューター",pos:[5],area:5},{id:117,lv:58,name:"ゴブリン・ティンカラー",pos:[5],area:5},{id:118,lv:58,name:"ゴブリン・ブランディッシャー",pos:[5],area:5},{id:119,lv:58,name:"サンベアー",pos:[12],area:5},{id:120,lv:59,name:"サンリーチ",pos:[13],area:5},{id:121,lv:58,name:"ダムゼルフライ",pos:[7],area:5},{id:122,lv:58,name:"タランチュラホーク",pos:[6],area:5},{id:123,lv:58,name:"ナルブルーイ",pos:[1],area:5},{id:124,lv:58,name:"モルボルグレート",pos:[10],area:5},{id:125,lv:58,name:"ラーテル",pos:[4],area:5},{id:126,lv:58,name:"ワイルドビースト",pos:[2],area:5},{id:127,lv:58,name:"III号ゴブリガードE型",pos:[5],area:5},{id:128,lv:59,name:"オーケアニス",pos:[13],area:5},{id:129,lv:59,name:"オプケン",pos:[16],area:5},{id:130,lv:59,name:"コカトリス",pos:[18],area:5},{id:131,lv:59,name:"ピフェリケラス",pos:[19],area:5},{id:132,lv:59,name:"ポロッゴ",pos:[17],area:5},{id:133,lv:59,name:"アラガンワーク・エンジニア",pos:[4],area:6},{id:134,lv:59,name:"アラガン・キマイラ",pos:[10],area:6},{id:135,lv:59,name:"アラガンワーク・ハーベストマン",pos:[3],area:6},{id:136,lv:59,name:"アラガンワーク・パラディン",pos:[4],area:6},{id:137,lv:59,name:"アラガン・ワークビット",pos:[34,35,36,37],area:6},{id:138,lv:59,name:"エンフォースドロイド",pos:[5],area:6},{id:139,lv:59,name:"エンプーサ",pos:[7,8],area:6},{id:140,lv:59,name:"オウルベア",pos:[2],area:6},{id:141,lv:59,name:"コープスフラワー",pos:[8],area:6},{id:142,lv:59,name:"プロトナーガ",pos:[9,11],area:6},{id:143,lv:59,name:"魔導アダマンクロー",pos:[20,22],area:6},{id:144,lv:59,name:"魔導コロッサスIII",pos:[21,26],area:6},{id:145,lv:59,name:"メラシディアン・アンフィプテレ",pos:[27],area:6},{id:146,lv:59,name:"メラシディアン・ヴィーヴル",pos:[32],area:6},{id:147,lv:59,name:"メラシディアン・ドラゴネット",pos:[31],area:6},{id:148,lv:59,name:"メラシディアン・ドラゴン",pos:[29],area:6},{id:149,lv:59,name:"メラシディアン・ファラク",pos:[28],area:6},{id:150,lv:59,name:"メラシディアン・プロビニャク",pos:[30],area:6},{id:151,lv:59,name:"ラミア・サイブリッド",pos:[6],area:6},{id:152,lv:59,name:"ラミア・テリトーク",pos:[6],area:6},{id:153,lv:59,name:"レッサーハイドラ",pos:[33],area:6},{id:154,lv:59,name:"レプトイド",pos:[9,14],area:6},{id:155,lv:59,name:"ルークスナッパー",pos:[1],area:6},{id:156,lv:59,name:"VIレギオン・ビット",pos:[15],area:6},{id:157,lv:59,name:"VIレギオン・シグニフェル",pos:[16,17,25,26],area:6},{id:158,lv:59,name:"VIレギオン・ラクエリウス",pos:[16,17,19,23,25,26],area:6},{id:159,lv:59,name:"VIレギオン・ホプロマクス",pos:[16,18,25],area:6},{id:160,lv:59,name:"VIレギオン・セクトール",pos:[18,25],area:6},{id:161,lv:59,name:"VIレギオン・ヴァンガード",pos:[16,17,19,25,18],area:6},{id:162,lv:59,name:"VIレギオン・エクエス",pos:[17,22,25],area:6},{id:163,lv:60,name:"ウォースバイト",pos:[38],area:6},{id:164,lv:60,name:"スフィンクス",pos:[38],area:6}]}},function(e,a,t){!function(){var a=t(10);e.exports=Backbone.Collection.extend({model:a})}()},function(e,a,t){!function(){t(11);e.exports=Backbone.Model.extend({defaults:{name:"Area",pos:[],mobs:[]},initialize:function(){}})}()},function(e,a,t){!function(){var a=t(12);e.exports=Backbone.Collection.extend({model:a,initialize:function(){this.selected={total:0,area:{1:0,2:0,3:0,4:0,5:0,6:0}},this.on("change:selected",this.handleSelected,this)},handleSelected:function(e){e.get("selected")?(this.selected.total++,this.selected.area[e.get("area")]++):(this.selected.total--,this.selected.area[e.get("area")]--)}})}()},function(e,a){!function(){e.exports=Backbone.Model.extend({defaults:{name:"Mob",area:1,lv:1,pos:[],selected:!1,killed:!1}})}()},function(e,a){!function(){e.exports=Backbone.Model.extend({defaults:{total:0}})}()}]);