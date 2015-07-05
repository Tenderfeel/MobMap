'use strict'
var gulp = require('gulp');

//https://www.npmjs.com/package/gulp-load-plugins
var $ = require('gulp-load-plugins')();

//Run a series of dependent gulp tasks in order
var runSequence = require('run-sequence');

//Time-saving synchronised browser testing.
var browserSync = require('browser-sync');

var webpack = require('webpack');

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('script', function() {
  webpack({
     entry: {
        main: ["./src/js/main.js"]
      },
      output: {
        path:"./dist/js",
        filename: "[name].js"
      },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin('main','main.js')
    ]
   }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
    })

});

gulp.task('watch', function(){
  gulp.watch(['src/**/*.html'], ['minify']);
});

gulp.task('serve', ['default'], function () {
  browserSync({
    notify: false,
    logPrefix: 'MM',
    server:"src"
  });

  gulp.watch(['src/**/*.html'], browserSync.reload);
});

gulp.task('serve:dist', function () {
  browserSync({
    server:"dist",
    notify: false,
    logPrefix: 'MM'
  });

  gulp.watch(['dist/**/*.js'], browserSync.reload);
  gulp.watch(['dist/**/*.html'], browserSync.reload);
});

gulp.task('default', function() {
  runSequence('html');
});
