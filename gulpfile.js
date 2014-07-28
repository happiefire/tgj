var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var webserver = require('gulp-webserver');
var fs = require('fs-extra');
var gutil = require('gulp-util');

gulp.task("jade", function(){
  gulp.src(["!src/html/base.jade", "!src/html/app.jade", "src/html/*.jade"])
  .pipe($.jade({ pretty: true }))
  .pipe(gulp.dest("build"));
});


gulp.task('stylus', function(){
  gulp.src(['src/css/*.styl'])
    .pipe($.stylus({errors: false}))
    .pipe($.autoprefixer('last 1 version'))
    .pipe(gulp.dest('build/css'));
});


gulp.task('coffee', function() {
  gulp.src(['src/js/**/*.coffee'])
    .pipe($.coffee({bare: true}).on('error', gutil.log))
    .pipe(gulp.dest('build/js'));
});


gulp.task('copy', function() {
  gulp.src(['src/**/*', '!src/html/**/*', '!src/html', '!src/css/**/*.styl', '!src/css/partials', '!src/css/partials/**/*', '!src/css/pages', '!src/css/pages/**/*'])
    .pipe(gulp.dest('build'));
});


gulp.task('serve', function(){

  gulp.src('build')
    .pipe(webserver({
      host: '0.0.0.0',
      fallback: 'index.html',
      livereload: true,
      directoryListing: false
    }));

  gulp.watch(['src/html/**/*.jade'], ['jade']);
  gulp.watch(['src/css/**/*.styl'], ['stylus']);
  gulp.watch(['src/**/*'], ['copy']);
  // gulp.watch(['src/js/**/*.coffee'], ['coffee']);
});


gulp.task('clean', function(){
  fs.remove('build', function(err){
    if (err) return console.error(err);
    console.log("success!");
  });
});


gulp.task('default', ['copy', 'jade', 'stylus', 'coffee']);
gulp.task('s', ['default', 'serve']);
