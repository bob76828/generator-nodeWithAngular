'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  bowerFiles = require('main-bower-files'),
  inject = require('gulp-inject'),
  del = require('del'),
  sass = require('gulp-sass'),
  merge = require('merge-stream'),
  runSequence = require('run-sequence'),
  browserSync = require('browser-sync');

var paths = {
  scripts: [
    'assets/vendor/js/**/*.js',
    'assets/app/initializer.js',
    'assets/app/app.js',
    'assets/app/route.js',
    'assets/app/*/**/*.js',
    'assets/common/**/*.js'
  ],
  styles: [
    'assets/vendor/css/**/*.css',
    'assets/css/*.scss'
  ],
  images: 'assets/images/**/*'
};

var reload = browserSync.reload;

gulp.task('dev_inject', function () {
    var style = gulp.src(paths.styles)
      .pipe(sass())
      .pipe(gulp.dest('./development/public/css'));

    var js = gulp.src('./assets/index.html')
      .pipe(inject(style, {addRootSlash: false, addPrefix: '..'}))
      .pipe(inject(gulp.src(paths.scripts, {read: false}), {addRootSlash: false, addPrefix: '..'}))
      .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', addRootSlash: false, addPrefix: '..'}))
      .pipe(inject(gulp.src('bower_components/modernizr/modernizr.js', {read: false}), {name: 'modernizr', addRootSlash: false, addPrefix: '..'}))
      .pipe(gulp.dest('./development'))
      .pipe(reload({stream:true}));

    return merge(style, js);
});

// Copy all static images
gulp.task('dev_images', function () {
  return gulp.src(paths.images).
    pipe(gulp.dest('./development/public/images'))
    .pipe(reload({stream: true}));
});

gulp.task('dev_clean', function (cb) {
  del(['development'], cb);
  console.log('Files deleted');
});

gulp.task('browser-sync', function () {
  browserSync({
    server: {
      baseDir: 'development',
      routes: {
        '/bower_components': 'bower_components',
        '/assets': 'assets',
        '/development': 'development'
      }
    }
  });
});

//developmnet
gulp.task('default', function (callback) {
  runSequence('dev_clean', 'dev_inject', 'dev_images', 'browser-sync', callback);
  watch(['assets/index.html', 'assets/app/**/*',
    'assets/common/**/*', 'assets/css/**/*'], function () {
    gulp.start('dev_inject');
  });
  watch(paths.images, function () {
    gulp.start('dev_images');
  });
});
