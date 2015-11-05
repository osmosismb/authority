var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');
var streamify = require('gulp-streamify');
var rimraf = require('gulp-rimraf');
var ignore = require('gulp-ignore');

var compass = require('gulp-compass');
var sass = require('gulp-sass');

gulp.task('scripts', function() {
  browserify({
    entries: 'src/js/index.jsx',
    extensions: ['.jsx', '.js'],
    debug: true
  })
    .transform(babelify)
    .bundle()
    .pipe(source('app.min.js'))
    .pipe(streamify(uglify()))
    .pipe(gulp.dest('httpdocs'));
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
