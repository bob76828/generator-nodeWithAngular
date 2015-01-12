'use strict';

var express = require('express'),
  path = require('path'),
  debug = require('debug')('express'),
//ExpressHTMLSnapshots = require('express-html-snapshots'),
  services = require('./services/index'),
  env = process.env.NODE_ENV || 'development',
  app = express();

services(app);

// development only
if (env === 'development') {
  var appRoot = require('app-root-path');

  app.set('views', appRoot + '/development');
  app.set('view engine', 'ejs');

  app.use('/development', express.static( appRoot + '/development'));
  app.use('/public', express.static(appRoot + '/development/public'));
  app.use('/bower_components', express.static(appRoot + '/bower_components'));
  app.use('/assets', express.static(appRoot + '/assets'));

  app.get('/', function (req, res) {
    res.render('index.ejs');
  });
  app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });
}

// production only
if (env === 'production') {
  app.set('views', __dirname);
  app.set('view engine', 'ejs');

  app.use('/public', express.static(path.join(__dirname, 'public')));
  app.use('/crossdomain.xml', express.static(path.join(__dirname, 'crossdomain.xml')));
  app.use('/humans.txt', express.static(path.join(__dirname, 'humans.txt')));
  app.use('/robots.txt', express.static(path.join(__dirname, 'robots.txt')));

  app.get('/', function (req, res) {
    res.render('index.ejs');
  });
  app.use(function (req, res) {
    res.status(404);
    if (req.accepts('html')) {
      res.render('404.ejs', {url: req.url});
      return;
    }
    // respond with json
    if (req.accepts('json')) {
      res.send({ error: 'Not found' });
      return;
    }
  });
}

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
  debug('Express server listening on port ' + server.address().port);
});
