var gulp = require('gulp');

// Gulp utils
var gutil = require('gulp-util');
var rimraf = require('gulp-rimraf');
var ignore = require('gulp-ignore');

// SCSS/Compass
var compass = require('gulp-compass');
var sass = require('gulp-sass');
var minify = require('gulp-minify-css');

// Webpack
var webpack = require('webpack');
var wbConfig = require('./webpack.config.js');

gulp.task('scripts', function(cb) {
  webpack(wbConfig, function (err, stats) {
    if(err) throw new gutil.PluginError("webpack", err);
    gutil.log("[webpack]", stats.toString());
    cb();
  });
});

gulp.task('styles', function() {
  return gulp.src('src/scss/**/*.scss')
    .pipe(compass({
      config_file: 'config.rb',
      css: 'httpdocs',
      sass: 'src/scss',
      bundle_exc: true
    }))
    .on('error', function(err) {
      this.emit('end');
    })
    .pipe(sass({ errLogToConsole: true }))
    .pipe(minify())
    .pipe(gulp.dest('httpdocs'));
});

gulp.task('clean', function() {
  return gulp.src('./httpdocs/**/*', { read: false })
    .pipe(ignore('index.php'))
    .pipe(rimraf());
});

gulp.task('watch', function() {
  gulp.watch([
    'src/js/**/*.jsx',
    'src/js/**/*.js',
    'src/js/index.jsx'
  ], {
    interval: 500
  }, function() {
    gulp.start('scripts');
  });

  gulp.watch('src/scss/**/*.scss', ['styles']);
});

gulp.task('build', ['styles', 'scripts'], function() {
  var files = [
    './src/php/**/*.php',
    './vendor/**/*',
    './templates/**/*.php'
  ];

  gulp.src(files, { base: './' })
    .pipe(gulp.dest('httpdocs'));
});

gulp.task('default', ['build']);
