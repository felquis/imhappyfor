var express = require('express');
var fs = require('fs');
var path = require('path');

var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var compress = require('compression');
var methodOverride = require('method-override');
var i18next = require('i18next');

i18next.init({
  ns: { namespaces: ['ns.common'], defaultNs: 'ns.common'},
  resSetPath: 'locales/__lng__/__ns__.json',
  saveMissing: true,
  sendMissingTo: 'all',
  debug: true,
  fallbackLng: 'en'
})

module.exports = function(app, config) {
  app.set('views', config.root + '/app/views');
  app.set('view engine', 'jade');

  // app.use(favicon(config.root + '/public/img/favicon.ico'));
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({
    extended: true
  }));
  app.use(cookieParser());
  app.use(compress());
  // 48 hours = 172800 seconds 
  app.use(express.static(config.root + '/public', { maxAge: 172800}));
  app.use(methodOverride());
  app.use(i18next.handle);
  i18next.registerAppHelper(app);

  var controllersPath = path.join(__dirname, '../app/controllers');
  fs.readdirSync(controllersPath).forEach(function (file) {
    if (/\.js$/.test(file)) {
      require(controllersPath + '/' + file)(app);
    }
  });

  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  if(app.get('env') === 'development'){
    app.use(function (err, req, res) {
      res.status(err.status || 500);
      res.render('error', {
        message: err.message,
        error: err,
        title: 'error'
      });
    });
  }

  app.use(function (err, req, res) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: {},
      title: 'error'
    });
  });

};
