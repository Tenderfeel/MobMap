(function () {
  'use strict';

  var Router = require('./routers/Router');
  var CheckAgent = require('./libs/CheckAgent');

  window.CheckAgent = new CheckAgent();

  window.router = new Router();

})();
