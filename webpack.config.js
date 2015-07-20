
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
  }
  ,externals: {
    'jquery': 'jQuery',
    'backbone': 'Backbone',
    'underscore': 'underscore'
  }
  ,plugins: [
      //<script>で読み込む順番にしないと"webpackJsonp"がないエラー出る・・・
      new webpack.optimize.CommonsChunkPlugin('main','main.js'),
      // ライブラリ間で依存しているモジュールが重複している場合、二重に読み込まないようにする
      new webpack.optimize.DedupePlugin()
      //Minimize all JavaScript output of chunks
      //圧縮ここでやるお
      ,new webpack.optimize.UglifyJsPlugin({
          compress: {
              warnings: false
          }
      })
  ]
};
