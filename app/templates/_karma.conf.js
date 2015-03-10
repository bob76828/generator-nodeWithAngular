'use strict';

module.exports = function (config) {
  config.set({
    basePath: './',
    files: [
      'bower_components/angular/angular.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'assets<%= clientPath %>vendor/js/**/*.js',
      'assets<%= clientPath %>app/initializer.js',
      'assets<%= clientPath %>app/app.js',
      'assets<%= clientPath %>app/route.js',
      'assets<%= clientPath %>app/*/**/*.js',
      'assets<%= clientPath %>common/**/*.js',
      'test/unit/**/*_test.js'
    ],
    preprocessors: {
      'test/unit/**/*.js': ['coverage']
    },
    autoWatch: true,
    frameworks: ['jasmine'],
    browsers: ['Chrome'],
    plugins: [
      'karma-chrome-launcher',
      'karma-firefox-launcher',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-coverage'
    ],
    reporters: ['progress','junit', 'coverage'],
    junitReporter: {
      outputFile: 'test_output/unit.xml',
      suite: 'unit'
    },
    coverageReporter: {
      type: 'html',
      dir: 'test_output/unit_coverage/'
    }
  });
};
