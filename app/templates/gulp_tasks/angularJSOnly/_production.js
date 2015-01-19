'use strict';

var version,
  gulp = require('gulp'),
//watch = require('gulp-watch'),
//coffee = require('gulp-coffee'),
  minifyCSS = require('gulp-minify-css'),
  concat = require('gulp-concat'),
  uglify = require('gulp-uglify'),
//sourcemaps = require('gulp-sourcemaps'),
  del = require('del'),
  gulpFilter = require('gulp-filter'),
  bowerFiles = require('main-bower-files'),
  runSequence = require('run-sequence'),
  htmlreplace = require('gulp-html-replace'),
  ngAnnotate = require('gulp-ng-annotate'),
  sass = require('gulp-sass'),
  ngHtml2Js = require('gulp-ng-html2js'),
  htmlmin = require('gulp-htmlmin'),
  injectString = require('gulp-inject-string'),
  merge = require('merge-stream'),
  git = require('gulp-git');
//uncss = require('gulp-uncss'),
//glob = require('glob');

var paths = {
  scripts: [
    'assets/app/initializer.js',
    'release/public/tmp/app.js',
    'assets/app/route.js',
    'assets/app/*/**/*.js',
    'assets/common/**/*.js'
  ],
  styles: [
    'assets/vendor/css/**/*.css',
    'assets/css/*.scss'
  ],
  images: 'assets/images/**/*',
  fonts: [
    'bower_components/bootstrap/dist/fonts/*',
    'bower_components/font-awesome/fonts/*'
  ],
  others: [
    'assets/404.html',
    'assets/apple-touch-icon-precomposed.png',
    'assets/crossdomain.xml',
    'assets/favicon.ico',
    'assets/humans.txt',
    'assets/robots.txt'
  ]
};

git.revParse({args: '--short HEAD'}, function (err, hash) {
  if(hash === undefined)
  {
    version = '000000';
  }
  else
  {
    version = hash;
  }
});

// Not all tasks need to use streams
// A gulpfile is just another node program and you can use all packages available on npm
gulp.task('clean', function (cb) {
  // You can use multiple globbing patterns as you would with `gulp.src`
  del(['build'], cb);
});

gulp.task('replace', function () {
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  return gulp.src('./assets/index.html')
    .pipe(htmlreplace({
      'css': 'public/css/app.min.css?v=' + version,
      'js': 'public/js/app.min.js?v=' + version,
      'modernizr': 'public/js/modernizr.min.js'
    }))
    .pipe(gulp.dest('release'));
});

gulp.task('styles', ['clean'], function () {
  var styles = gulp.src(paths.styles)
    .pipe(sass())
    .pipe(concat('app.css'))
    .pipe(minifyCSS({keepBreaks: false}))
    .pipe(gulp.dest('release/public/tmp'));

  var fonts = gulp.src(paths.fonts)
    .pipe(gulp.dest('release/public/fonts'));

  return merge(styles, fonts);
});

gulp.task('bower', ['clean'], function () {
  var js = gulp.src(bowerFiles())
    .pipe(gulpFilter('**/*.js'))
    .pipe(concat('bower.js'))
    .pipe(gulp.dest('release/public/tmp'));

  var css = gulp.src(bowerFiles())
    .pipe(gulpFilter('**/*.css'))
    .pipe(concat('bower.css'))
    .pipe(gulp.dest('release/public/tmp'));

  return merge(js, css);
});

gulp.task('modernizr', ['clean'], function () {
  return gulp.src('bower_components/modernizr/modernizr.js')
    .pipe(concat('modernizr.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('release/public/js'));
});

gulp.task('vendor', ['clean'], function () {
  var js = gulp.src('assets/vendor/js/**/*.js')
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('release/public/tmp'));

  var css = gulp.src('assets/vendor/css/**/*.css')
    .pipe(concat('vendor.css'))
    .pipe(gulp.dest('release/public/tmp'));

  return merge(js, css);
});

gulp.task('scripts', ['clean'], function () {
  return gulp.src(paths.scripts)
    //.pipe(sourcemaps.init())
    //.pipe(coffee())
    .pipe(concat('scripts.js'))
    .pipe(ngAnnotate())
    //.pipe(sourcemaps.write())
    .pipe(gulp.dest('release/public/tmp'));
});

gulp.task('combine', ['clean'], function () {
  var js = gulp.src(['release/public/tmp/bower.js', 'release/public/tmp/vendor.js', 'release/public/tmp/layout.js',
    'release/public/tmp/view.js', 'release/public/tmp/partials.js', 'release/public/tmp/scripts.js'])
    .pipe(concat('app.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('release/public/js'));

  var css = gulp.src(['release/public/tmp/bower.css', 'release/public/tmp/vendor.css', 'release/public/tmp/app.css'])
    //.pipe(uncss({
    //  html: glob.sync('assets/**/*.html')
    //}))
    .pipe(concat('app.min.css'))
    .pipe(minifyCSS({keepBreaks: true}))
    .pipe(gulp.dest('release/public/css'));

  return merge(js, css);
});

// Copy all static images
gulp.task('images', function () {
  return gulp.src(paths.images)
    .pipe(gulp.dest('release/public/images'));
});

gulp.task('views', function () {
  return gulp.src('assets/app/**/*.html')
    .pipe(htmlmin())
    .pipe(ngHtml2Js({
      moduleName: 'ui.partials',
      prefix: '../assets/app/'
    }))
    .pipe(concat('view.js'))
    .pipe(gulp.dest('release/public/tmp'));
});

gulp.task('layout', function () {
  var layout = gulp.src('assets/common/layout/**/*.html')
    .pipe(htmlmin())
    .pipe(ngHtml2Js({
      moduleName: 'ui.partials',
      prefix: '../assets/common/layout/'
    }))
    .pipe(concat('layout.js'))
    .pipe(gulp.dest('release/public/tmp'));

  var partials = gulp.src('assets/common/partials/**/*.html')
    .pipe(htmlmin())
    .pipe(ngHtml2Js({
      moduleName: 'ui.partials',
      prefix: '../assets/common/partials/'
    }))
    .pipe(concat('partials.js'))
    .pipe(gulp.dest('release/public/tmp'));

  return merge(layout, partials);
});

gulp.task('remove_release', function (cb) {
  del(['release'], cb);
  console.log('release deleted');
});

gulp.task('clean_tmp', function (cb) {
  del(['release/public/tmp'], cb);
  console.log('tmp deleted');
});

gulp.task('inject_partials', function () {
  // It's not necessary to read the files (will speed up things), we're only after their paths:
  return gulp.src('assets/app/app.js')
    .pipe(injectString.after('angular.module(\'<%= scriptAppName %>\', [', '\'ui.partials\','))
    .pipe(gulp.dest('release/public/tmp'));
});

gulp.task('copy_others', function () {
  return gulp.src(paths.others)
    .pipe(gulp.dest('release'));
});

//production
gulp.task('production', function (callback) {
  runSequence('remove_release',
    'inject_partials',
    ['modernizr', 'bower', 'vendor'],
    ['styles', 'scripts', 'images', 'views', 'layout'],
    'combine',
    ['replace', 'copy_others'],
    'clean_tmp',
    callback);
});
