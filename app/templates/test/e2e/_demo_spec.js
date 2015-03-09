'use strict';

describe('app start', function() {

  browser.get('index.html');

  it('should automatically redirect to /', function() {
    expect(browser.getLocationAbsUrl()).toMatch("/");
  });
});
