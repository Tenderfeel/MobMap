'use strict'
var gulp = require('gulp');

//https://www.npmjs.com/package/gulp-load-plugins
var $ = require('gulp-load-plugins')();

//Run a series of dependent gulp tasks in order
var runSequence = require('run-sequence');

//Time-saving synchronised browser testing.
var browserSync = require('browser-sync');



gulp.task('minify', function() {
  return gulp.src('src/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});


gulp.task('watch', function(){
  gulp.watch(['src/**/*.html'], ['minify']);
});

// Build and serve the output from the dist build
gulp.task('serve', ['default'], function () {
  browserSync({
    notify: false,
    logPrefix: 'MM',
    // Run as an https by uncommenting 'https: true'
    // Note: this uses an unsigned certificate which on first access
    //       will present a certificate warning in the browser.
    // https: true,
    server: 'src'
  });

  gulp.watch(['src/**/*.html'], browserSync.reload);
});

gulp.task('default', function() {
  runSequence('minify');
});
