
var node_dir = __dirname + '/node_modules';
var webpack = require('webpack');

module.exports = {
   entry: {
      main: ["./src/js/main.js"]
    },
    //出力されるファイル
    output: {
      path:"./dist/js",
      filename: "[name].js"
    },
    watch: true,
    resolve: {
      modulesDirectories: ['node_modules'],
      // //aliasを貼るとrequire('jquery');のようにパス無しでつかえる
      // alias: {
      //     'jquery': node_dir + '/jquery/dist/jquery.js',
      //     'underscore': node_dir + '/underscore/underscore.js',
      //     'backbone': node_dir + '/backbone/backbone.js'
      // }
    }
  ,externals: {
    'jquery': 'jQuery',
    'backbone': 'Backbone',
    'underscore': 'underscore'
  }
  ,plugins: [
      //<script>で読み込む順番にしないと"webpackJsonp"がないエラー出る・・・
    //  new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.js'),
      new webpack.optimize.CommonsChunkPlugin('main','main.js'),
      // ライブラリ間で依存しているモジュールが重複している場合、二重に読み込まないようにする
      new webpack.optimize.DedupePlugin()
      //グローバルに出す設定。requireせず使えるようになる
      // ,new webpack.ProvidePlugin({
      //     $: 'jquery',
      //      '_': 'underscore',
      //     Backbone: 'backbone'
      // })
      //Minimize all JavaScript output of chunks
      //圧縮ここでやるお
      ,new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      })
  ]
};
