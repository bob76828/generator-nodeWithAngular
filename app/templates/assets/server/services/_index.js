'use strict';

var express = require('express'),
  apiRouter = express.Router();

apiRouter.use('/sampleService', require('./sampleService'));

module.exports = apiRouter;
