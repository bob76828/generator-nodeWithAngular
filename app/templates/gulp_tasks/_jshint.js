'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var scripts = [
  'assets/client/app/initializer.js',
  'assets/client/app/app.js',
  'assets/client/app/route.js',
  'assets/client/app/*/**/*.js',
  'assets/client/common/**/*.js',
  'assets/server/**/*.js'
];

gulp.task('jshint', function() {
    return gulp.src(scripts)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
