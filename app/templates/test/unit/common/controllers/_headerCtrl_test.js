'use strict';

describe('main page', function() {

  beforeEach(module('ng.controller'));

  describe('header controller', function(){

    it('should BeDefined', inject(function($controller) {
      //spec body
      var headerCtrl = $controller('headerCtrl');
      expect(headerCtrl).toBeDefined();
    }));

  });
});
