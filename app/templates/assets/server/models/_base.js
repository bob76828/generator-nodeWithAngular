'use strict';

var rest = require('restler'),
  Q = require('q');

module.exports = function (apiPath) {

  var Base = function () {
  };

  Base.prototype.get = function (data, success, fail) {
    var deferred = Q.defer();
    rest.get(apiPath + '/' + data.id)
      .on('2XX', function (data) {
        if (success !== undefined) {
          success(data);
        }
        deferred.resolve(data);
      }).on('4XX', function (data) {
        if (fail !== undefined) {
          fail(data, '4XX');
        }
        deferred.reject(data);
      }).on('5XX', function (data) {
        if (fail !== undefined) {
          fail(data, '5XX');
        }
        deferred.reject(data);
      });
    return deferred;
  };

  Base.prototype.getAll = function (success, fail) {
    var deferred = Q.defer();
    rest.get(apiPath)
      .on('2XX', function (data) {
        if (success !== undefined) {
          success(data);
        }
        deferred.resolve(data);
      }).on('4XX', function (data) {
        if (fail !== undefined) {
          fail(data, '4XX');
        }
        deferred.reject(data);
      }).on('5XX', function (data) {
        if (fail !== undefined) {
          fail(data, '5XX');
        }
        deferred.reject(data);
      });
    return deferred;
  };

  Base.prototype.save = function (data, success, fail) {
    var deferred = Q.defer();
    rest.post(apiPath, {data: data})
      .on('2XX', function (data) {
        if (success !== undefined) {
          success(data);
        }
        deferred.resolve(data);
      }).on('4XX', function (data) {
        if (fail !== undefined) {
          fail(data, '4XX');
        }
        deferred.reject(data);
      }).on('5XX', function (data) {
        if (fail !== undefined) {
          fail(data, '5XX');
        }
        deferred.reject(data);
      });
    return deferred;
  };

  Base.prototype.update = function (data, success, fail) {
    var deferred = Q.defer(),
      id = data.id;
    delete data.id;
    rest.put(apiPath + '/' + id, {data: data})
      .on('2XX', function (data) {
        if (success !== undefined) {
          success(data);
        }
        deferred.resolve(data);
      }).on('4XX', function (data) {
        if (fail !== undefined) {
          fail(data, '4XX');
        }
        deferred.reject(data);
      }).on('5XX', function (data) {
        if (fail !== undefined) {
          fail(data, '5XX');
        }
        deferred.reject(data);
      });
    return deferred;
  };

  Base.prototype.remove = function (data, success, fail) {
    var deferred = Q.defer();
    rest.del(apiPath + '/' + data.id)
      .on('2XX', function (data) {
        if (success !== undefined) {
          success(data);
        }
        deferred.resolve(data);
      }).on('4XX', function (data) {
        if (fail !== undefined) {
          fail(data, '4XX');
        }
        deferred.reject(data);
      }).on('5XX', function (data) {
        if (fail !== undefined) {
          fail(data, '5XX');
        }
        deferred.reject(data);
      });
    return deferred;
  };

  return new Base();
};
