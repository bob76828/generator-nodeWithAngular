'use strict';

var rest = require('restler'),
  apiPath = 'http://beta.json-generator.com/api/json/get/M4Ze1sg',
  base = require('./base')(apiPath),
  Q = require('q');

module.exports = base;
