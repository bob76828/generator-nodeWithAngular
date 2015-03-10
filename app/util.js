'use strict';

var copyClient = function (yeoman) {
  yeoman.mkdir('assets');
  yeoman.mkdir('assets/client');
  yeoman.copy('assets/client/_404.ejs', 'assets/client/404.ejs');
  yeoman.copy('assets/client/_crossdomain.xml', 'assets/client/crossdomain.xml');
  yeoman.copy('assets/client/_humans.txt', 'assets/client/humans.txt');
  yeoman.copy('assets/client/_index.ejs', 'assets/client/index.ejs');
  yeoman.copy('assets/client/_robots.txt', 'assets/client/robots.txt');

  yeoman.mkdir('assets/client/app');
  yeoman.copy('assets/client/app/_app.js', 'assets/client/app/app.js');
  yeoman.copy('assets/client/app/_initializer.js', 'assets/client/app/initializer.js');
  yeoman.copy('assets/client/app/_route.js', 'assets/client/app/route.js');

  yeoman.mkdir('assets/client/app/main');
  yeoman.copy('assets/client/app/main/_content.html', 'assets/client/app/main/content.html');
  yeoman.copy('assets/client/app/main/_mainCtrl.js', 'assets/client/app/main/mainCtrl.js');

  yeoman.mkdir('assets/client/common');
  yeoman.mkdir('assets/client/common/controllers');
  yeoman.copy('assets/client/common/controllers/_readMe.txt', 'assets/client/common/controllers/readMe.txt');
  yeoman.copy('assets/client/common/controllers/_headerCtrl.js', 'assets/client/common/controllers/headerCtrl.js');

  yeoman.mkdir('assets/client/common/directives');
  yeoman.copy('assets/client/common/directives/_readMe.txt', 'assets/client/common/directives/readMe.txt');

  yeoman.mkdir('assets/client/common/layout');
  yeoman.copy('assets/client/common/layout/_layout.html', 'assets/client/common/layout/layout.html');
  yeoman.copy('assets/client/common/layout/_footer.html', 'assets/client/common/layout/footer.html');
  yeoman.copy('assets/client/common/layout/_header.html', 'assets/client/common/layout/header.html');


  yeoman.mkdir('assets/client/common/models');
  yeoman.copy('assets/client/common/models/_readMe.txt', 'assets/client/common/models/readMe.txt');

  yeoman.mkdir('assets/client/common/partials');
  yeoman.copy('assets/client/common/partials/_readMe.txt', 'assets/client/common/partials/readMe.txt');

  yeoman.mkdir('assets/client/common/services');
  yeoman.copy('assets/client/common/services/_readMe.txt', 'assets/client/common/services/readMe.txt');

  yeoman.mkdir('assets/client/css');
  yeoman.copy('assets/client/css/_app.scss', 'assets/client/css/app.scss');

  yeoman.mkdir('assets/client/css/includes');
  yeoman.copy('assets/client/css/includes/_main.scss', 'assets/client/css/includes/_main.scss');

  yeoman.mkdir('assets/client/images');
  yeoman.copy('assets/client/images/_apple-touch-icon-precomposed.png', 'assets/client/images/apple-touch-icon-precomposed.png');
  yeoman.copy('assets/client/images/_favicon.ico', 'assets/client/images/favicon.ico');
  yeoman.copy('assets/client/images/_readMe.txt', 'assets/client/images/readMe.txt');

  yeoman.mkdir('assets/client/vendor');
  yeoman.mkdir('assets/client/vendor/css');
  yeoman.copy('assets/client/vendor/css/_readMe.txt', 'assets/client/vendor/css/readMe.txt');

  yeoman.mkdir('assets/client/vendor/js');
  yeoman.copy('assets/client/vendor/js/_readMe.txt', 'assets/client/vendor/js/readMe.txt');
  yeoman.copy('assets/client/vendor/js/_plugins.js', 'assets/client/vendor/js/plugins.js');

  yeoman.mkdir('gulp_tasks');
  yeoman.copy('gulp_tasks/_deploy.js', 'gulp_tasks/deploy.js');
  yeoman.copy('gulp_tasks/_development.js', 'gulp_tasks/development.js');
  yeoman.copy('gulp_tasks/_jshint.js', 'gulp_tasks/jshint.js');
  yeoman.copy('gulp_tasks/_production.js', 'gulp_tasks/production.js');

  yeoman.mkdir('test');
  yeoman.mkdir('test/e2e');
  yeoman.mkdir('test/unit');
  yeoman.mkdir('test/unit/common');
  yeoman.mkdir('test/unit/common/controllers');
  yeoman.mkdir('test/unit/main');
  yeoman.copy('test/e2e/_demo_spec.js', 'test/e2e/demo_spec.js');
  yeoman.copy('test/unit/common/controllers/_headerCtrl_test.js', 'test/unit/common/controllers/headerCtrl_test.js');
  yeoman.copy('test/unit/main/_mainCtrl_test.js', 'test/unit/main/mainCtrl_test.js');
};

var copyServer = function (yeoman) {
  yeoman.mkdir('assets');
  yeoman.mkdir('assets/server');
  yeoman.copy('assets/server/_app.js', 'assets/server/app.js');

  yeoman.mkdir('assets/server/services');
  yeoman.copy('assets/server/services/_index.js', 'assets/server/services/index.js');
  yeoman.copy('assets/server/services/_sampleService.js', 'assets/server/services/sampleService.js');

};

var copyAngular = function(yeoman){
  yeoman.mkdir('assets');
  yeoman.copy('assets/angularJSOnly/_404.html', 'assets/404.html');
  yeoman.copy('assets/angularJSOnly/_crossdomain.xml', 'assets/crossdomain.xml');
  yeoman.copy('assets/angularJSOnly/_humans.txt', 'assets/humans.txt');
  yeoman.copy('assets/angularJSOnly/_index.html', 'assets/index.html');
  yeoman.copy('assets/angularJSOnly/_robots.txt', 'assets/robots.txt');

  yeoman.mkdir('assets/app');
  yeoman.copy('assets/angularJSOnly/app/_app.js', 'assets/app/app.js');
  yeoman.copy('assets/angularJSOnly/app/_initializer.js', 'assets/app/initializer.js');
  yeoman.copy('assets/angularJSOnly/app/_route.js', 'assets/app/route.js');

  yeoman.mkdir('assets/app/main');
  yeoman.copy('assets/angularJSOnly/app/main/_content.html', 'assets/app/main/content.html');
  yeoman.copy('assets/angularJSOnly/app/main/_mainCtrl.js', 'assets/app/main/mainCtrl.js');

  yeoman.mkdir('assets/common');
  yeoman.mkdir('assets/common/controllers');
  yeoman.copy('assets/angularJSOnly/common/controllers/_readMe.txt', 'assets/common/controllers/readMe.txt');
  yeoman.copy('assets/angularJSOnly/common/controllers/_headerCtrl.js', 'assets/common/controllers/headerCtrl.js');

  yeoman.mkdir('assets/common/directives');
  yeoman.copy('assets/angularJSOnly/common/directives/_readMe.txt', 'assets/common/directives/readMe.txt');

  yeoman.mkdir('assets/common/layout');
  yeoman.copy('assets/angularJSOnly/common/layout/_layout.html', 'assets/common/layout/layout.html');
  yeoman.copy('assets/angularJSOnly/common/layout/_footer.html', 'assets/common/layout/footer.html');
  yeoman.copy('assets/angularJSOnly/common/layout/_header.html', 'assets/common/layout/header.html');


  yeoman.mkdir('assets/common/models');
  yeoman.copy('assets/angularJSOnly/common/models/_readMe.txt', 'assets/common/models/readMe.txt');

  yeoman.mkdir('assets/common/partials');
  yeoman.copy('assets/angularJSOnly/common/partials/_readMe.txt', 'assets/common/partials/readMe.txt');

  yeoman.mkdir('assets/common/services');
  yeoman.copy('assets/angularJSOnly/common/services/_readMe.txt', 'assets/common/services/readMe.txt');

  yeoman.mkdir('assets/css');
  yeoman.copy('assets/angularJSOnly/css/_app.scss', 'assets/css/app.scss');

  yeoman.mkdir('assets/css/includes');
  yeoman.copy('assets/angularJSOnly/css/includes/_main.scss', 'assets/css/includes/_main.scss');

  yeoman.mkdir('assets/images');
  yeoman.copy('assets/angularJSOnly/images/_apple-touch-icon-precomposed.png', 'assets/images/apple-touch-icon-precomposed.png');
  yeoman.copy('assets/angularJSOnly/images/_favicon.ico', 'assets/images/favicon.ico');

  yeoman.mkdir('assets/vendor');
  yeoman.mkdir('assets/vendor/css');
  yeoman.copy('assets/angularJSOnly/vendor/css/_readMe.txt', 'assets/vendor/css/readMe.txt');

  yeoman.mkdir('assets/vendor/js');
  yeoman.copy('assets/angularJSOnly/vendor/js/_readMe.txt', 'assets/vendor/js/readMe.txt');
  yeoman.copy('assets/angularJSOnly/vendor/js/_plugins.js', 'assets/vendor/js/plugins.js');

  yeoman.mkdir('gulp_tasks');
  yeoman.copy('gulp_tasks/angularJSOnly/_deploy.js', 'gulp_tasks/deploy.js');
  yeoman.copy('gulp_tasks/angularJSOnly/_development.js', 'gulp_tasks/development.js');
  yeoman.copy('gulp_tasks/angularJSOnly/_jshint.js', 'gulp_tasks/jshint.js');
  yeoman.copy('gulp_tasks/angularJSOnly/_production.js', 'gulp_tasks/production.js');

  yeoman.mkdir('test');
  yeoman.mkdir('test/e2e');
  yeoman.mkdir('test/unit');
  yeoman.mkdir('test/unit/common');
  yeoman.mkdir('test/unit/common/controllers');
  yeoman.mkdir('test/unit/main');
  yeoman.copy('test/e2e/_demo_spec.js', 'test/e2e/demo_spec.js');
  yeoman.copy('test/unit/common/controllers/_headerCtrl_test.js', 'test/unit/common/controllers/headerCtrl_test.js');
  yeoman.copy('test/unit/main/_mainCtrl_test.js', 'test/unit/main/mainCtrl_test.js');
};

module.exports = {
  copyClient: copyClient,
  copyServer: copyServer,
  copyAngular: copyAngular
};
