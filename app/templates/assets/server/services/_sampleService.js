'use strict';

var express = require('express'),
  router = express.Router(),
  Q = require('q'),
  sample = require('../models/sample');

router.route('/').get(function (req, res) {
  var promises = [];
  promises.push(sample.test(null,
    function (response) {
      console.log('promises');
      console.log(response);
    }).promise);

  Q.all(promises).then(
    function (response) {
      console.log('all');
      console.log(response);
      res.json(response);
    }, function (response) {
      console.log('error');
      res.status(400).json(response);
    });
});

module.exports = router;
