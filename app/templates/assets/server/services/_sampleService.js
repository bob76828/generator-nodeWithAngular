'use strict';

var express = require('express'),
  router = express.Router(),
  Q = require('q'),
  rest = require('../models/sample');

router.route('/').get(function (req, res) {
  var promises = [];
  promises.push(rest.get(null,
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
