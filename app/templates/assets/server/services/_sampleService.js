'use strict';

var express = require('express'),
  rest = require('restler'),
  router = express.Router(),
  Q = require('q'),
  apiPath = 'http://beta.json-generator.com/api/json/get/M4Ze1sg';

router.route('/').get(function (req, res) {
  rest.get(apiPath)
    .on('2XX', function (data) {
      res.json(data);
    }).on('4XX', function (data) {
      res.json(data);
    }).on('5XX', function (data) {
      res.json(data);
    });
});

module.exports = router;
