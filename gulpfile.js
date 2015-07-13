'use strict'
var gulp = require('gulp');

//https://www.npmjs.com/package/gulp-load-plugins
var $ = require('gulp-load-plugins')();

//Run a series of dependent gulp tasks in order
var runSequence = require('run-sequence');

//Time-saving synchronised browser testing.
var browserSync = require('browser-sync');

var webpack = require('webpack');
var webpackConfig = require('./webpack.config.js');

var pngquant = require('imagemin-pngquant');


gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

gulp.task('image', function () {
    return gulp.src('src/images/**/*.+(jpg|png|gif)')
        .pipe($.imagemin({
            progressive: true,
            use: [pngquant({quality: '60-80', speed: 1})]
        }))
        .pipe(gulp.dest('dist/images'));
});

/*
webpack
http://webpack.github.io/docs/
*/
gulp.task('webpack', function() {
  var config = Object.create(webpackConfig);
  webpack(config , function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
    })

});

/*
ファイル監視
*/
gulp.task('watch', function(){
  gulp.watch(['src/**/*.html'], ['html']);
  gulp.watch(['src/**/*.js'], ['webpack']);
});

/*
browserSync
*/
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
