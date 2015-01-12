'use strict';

var rest = require('restler'),
  Q = require('q');

exports.get = function (data,success,fail) {
  var deferred = Q.defer();
  rest.get('http://beta.json-generator.com/api/json/get/M4Ze1sg')
    .on('2XX', function (data) {
      if(success !== undefined)
      {
        success(data);
      }
      deferred.resolve(data);
  }).on('4XX', function (data) {
      if(fail !== undefined)
      {
        fail(data,'4XX');
      }
      deferred.reject(data);
  }).on('5XX', function (data) {
      if(fail !== undefined)
      {
        fail(data,'5XX');
      }
      deferred.reject(data);
  });
  return deferred;
};
