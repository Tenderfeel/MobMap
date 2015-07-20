(function() {
  var CheckAgent = function() {
    this.result = {
      TYPE: null,
      OS: null,
      LANG: window.navigator.language,
      BROWSER: null,
      ANDROID: false,
      APPLE: false,
      SMARTPHONE: false,
      DEVICE_NAME: null,
      VERSION: null
    };
    this.ua = window.navigator.userAgent;
    this.av = window.navigator.appVersion;

    this._OS();
    this._BROWSER();
    this._SMARTPHONE();
  };

  CheckAgent.prototype.get = function() {
    return this.result;
  };

  CheckAgent.prototype.isSmartPhone = function() {
    return this.result.SMARTPHONE
  };

  CheckAgent.prototype._OS = function(){
    if(this.ua.indexOf('Android') !== -1){
      this.result.OS = 'android';
      this._Android();

    } else if( this.ua.indexOf('iPhone') !== -1 ) {
      this.result.OS = 'ios';
      this.result.DEVICE_NAME = 'iPhone';
      this._Apple();

    } else if( this.ua.indexOf('iPad') !== -1 ) {
      this.result.OS = 'ios';
      this.result.DEVICE_NAME = 'iPad';
      this._Apple();

    } else if ( this.ua.indexOf('iPod') !== -1 ){
      this.result.OS = 'ios';
      this.result.DEVICE_NAME = 'iPod';
      this._Apple();

    } else { //PC用ブラウザ
      var m = this.ua.match(/\((\w+);*/i);
      this.result.OS = m[1].toLowerCase();
    }
  };

  CheckAgent.prototype._BROWSER = function() {

    var ua = this.ua.toLowerCase();
    var av = this.av.toLowerCase();

    if (ua.indexOf('msie') != -1) { //IE全般
      this.result.BROWSER = 'ie';
      if (av.indexOf("msie 6.") != -1) {
        //IE6
      }else if (av.indexOf("msie 7.") != -1) {
        //IE7
      }else if (av.indexOf("msie 8.") != -1) {
        //IE8
      }else if (av.indexOf("msie 9.") != -1) {
        //IE9
      }else if (av.indexOf("msie 10.") != -1) {
        //IE10
      }
    }else if (ua.indexOf('chrome') != -1) { //Chrome
      this.result.BROWSER = 'chrome';
    }else if (ua.indexOf('safari') != -1) { //Safari
      this.result.BROWSER = 'safari';
    }else if (ua.indexOf('firefox') != -1) { //Firefox
      this.result.BROWSER = 'firefox';
    }else if (ua.indexOf('opera') != -1) { //Opera
      this.result.BROWSER = 'opera';
    }
  };

  CheckAgent.prototype._SMARTPHONE = function() {
    this.result.SMARTPHONE = (this.result.ANDROID || this.result.APPLE)
      && ( window.innerWidth === screen.width )
      && (window.orientation >= 0);
    this.result.TYPE = this.result.SMARTPHONE ? 'smartphone' : 'pc';
  };

  CheckAgent.prototype._Android = function() {
    var m = this.ua.match(/Android ([\d\.]*);\s([\w\-]+)/i);
     this.result.ANDROID = true;
     this.result.VERSION = m[1];
     this.result.DEVICE_NAME = m[2];
     return true;
  };

  CheckAgent.prototype._Apple = function() {
    var m = this.ua.match(/\((\w+);[\w\s]*?\s[\w\s]+? OS (\d_\d(?:_\d)*)/i);
    this.result.VERSION = m[2].replace(/_/ig, '.');
    this.result.APPLE = true;
  };


  module.exports = CheckAgent;

})();
