'use strict';

var gulp = require('gulp'),
  watch = require('gulp-watch'),
  bowerFiles = require('main-bower-files'),
  inject = require('gulp-inject'),
  del = require('del'),
  sass = require('gulp-sass'),
  runSequence = require('run-sequence'),
  merge = require('merge-stream'),
  browserSync = require('browser-sync'),
  server = require('gulp-nodemon');

var paths = {
  scripts: [
    'assets/client/vendor/js/**/*.js',
    'assets/client/app/initializer.js',
    'assets/client/app/app.js',
    'assets/client/app/route.js',
    'assets/client/app/*/**/*.js',
    'assets/client/common/**/*.js'
  ],
  styles: [
    'assets/client/vendor/css/**/*.css',
    'assets/client/css/*.scss'
  ],
  images: 'assets/client/images/**/*',
  server: 'assets/server/**/*'
};

var reload = browserSync.reload;

gulp.task('dev_inject', function () {
  var style = gulp.src(paths.styles)
    .pipe(sass())
    .pipe(gulp.dest('./development/public/css'));

  var js = gulp.src('./assets/client/index.ejs')
    .pipe(inject(style, {addRootSlash: false, addPrefix: '..'}))
    .pipe(inject(gulp.src(paths.scripts, {read: false}), {addRootSlash: false, addPrefix: '..'}))
    .pipe(inject(gulp.src(bowerFiles(), {read: false}), {name: 'bower', addRootSlash: false, addPrefix: '..'}))
    .pipe(inject(gulp.src('bower_components/modernizr/modernizr.js', {read: false}), {
      name: 'modernizr',
      addRootSlash: false,
      addPrefix: '..'
    }))
    .pipe(gulp.dest('./development'))
    .pipe(reload({stream: true}));

  return merge(style, js);
});

// Copy all static images
gulp.task('dev_images', function () {
  return gulp.src(paths.images).
    pipe(gulp.dest('./development/public/images'))
    .pipe(reload({stream: true}));

});

gulp.task('dev_clean', function (cb) {
  del(['./development'], cb);
  console.log('Files deleted');
});

gulp.task('browser-sync', function () {
  browserSync({
    proxy: 'http://localhost:3000',
    port: 3001
  });
});

gulp.task('dev_server_start', function () {
  // Start the server at the beginning of the task
  return server({script: 'assets/server/app.js', ext: 'js'})
    .on('restart', function () {
      console.log('restarted!');
    });
});

//developmnet
gulp.task('default', function (callback) {
  runSequence('dev_clean', 'dev_inject', 'dev_images', 'dev_server_start', 'browser-sync', callback);
  watch(['assets/client/index.ejs', 'assets/client/app/**/*',
    'assets/client/common/**/*', 'assets/client/css/**/*'], function () {
    gulp.start('dev_inject');
  });
  watch(paths.images, function () {
    gulp.start('dev_images');
  });
});
