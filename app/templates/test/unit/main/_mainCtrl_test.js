'use strict';

describe('main page', function() {

  beforeEach(module('ng.controller'));

  describe('main controller', function(){

    it('should BeDefined', inject(function($controller) {
      //spec body
      var mainCtrl = $controller('mainCtrl');
      expect(mainCtrl).toBeDefined();
    }));

  });
});
