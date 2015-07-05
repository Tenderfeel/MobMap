'use strict'
var gulp = require('gulp');

//https://www.npmjs.com/package/gulp-load-plugins
var $ = require('gulp-load-plugins')();

//Run a series of dependent gulp tasks in order
var runSequence = require('run-sequence');

//Time-saving synchronised browser testing.
var browserSync = require('browser-sync');

var webpack = require('webpack');

var node_dir = __dirname + '/node_modules';

gulp.task('html', function() {
  return gulp.src('src/*.html')
    .pipe($.htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'))
});

/*
webpack
http://webpack.github.io/docs/
*/
gulp.task('webpack', function() {
  webpack({
     entry: {
        main: ["./src/js/main.js"],
        vendor: ['jquery']
      },
      //出力されるファイル
      output: {
        path:"./dist/js",
        filename: "[name].js"
      },
      resolve: {
        modulesDirectories: ['node_modules'],
        //aliasを貼るとrequire('jquery');のようにパス無しでつかえる
        alias: {
            'jquery': node_dir + '/jquery/dist/jquery.js',
            'underscore': node_dir + '/underscore/underscore.js',
            'backbone': node_dir + '/backbone/backbone.js'
        }
      }
    // ,externals: {
    //   'jquery': 'jQuery'
    // }
    ,plugins: [
        //<script>で読み込む順番にしないと"webpackJsonp"がないエラー出る・・・
        new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
        new webpack.optimize.CommonsChunkPlugin('main','main.js'),
        // ライブラリ間で依存しているモジュールが重複している場合、二重に読み込まないようにする
        new webpack.optimize.DedupePlugin()
        //グローバルに出す設定。requireせず使えるようになる
        ,new webpack.ProvidePlugin({
            $: 'jquery',
             _: 'underscore',
            Backbone: 'backbone'
        })
        //Minimize all JavaScript output of chunks
        //圧縮ここでやるお
        ,new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        })
    ]
   }, function(err, stats) {
        if(err) throw new gutil.PluginError("webpack", err);
    })

});

/*
ファイル監視
*/
gulp.task('watch', function(){
  gulp.watch(['src/**/*.html'], ['minify']);
  gulp.watch(['src/**/*.js'], ['script']);
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
