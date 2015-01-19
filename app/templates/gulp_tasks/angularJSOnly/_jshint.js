'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    stylish = require('jshint-stylish');

var scripts = [
  'assets/app/initializer.js',
  'assets/app/app.js',
  'assets/app/route.js',
  'assets/app/*/**/*.js',
  'assets/common/**/*.js'
];

gulp.task('jshint', function() {
    return gulp.src(scripts)
        .pipe(jshint())
        .pipe(jshint.reporter(stylish));
});
