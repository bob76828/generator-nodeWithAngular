'use strict';

var express = require('express'),
  apiRouter = express.Router();

module.exports = function(app) {
  app.use('/api',apiRouter);
  apiRouter.use('/sampleService', require('./sampleService'));
};
