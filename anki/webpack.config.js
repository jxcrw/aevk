const glob = require("glob-all");
const path = require('path');
const PurifyCSSPlugin = require('purifycss-webpack');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
  entry: { main: './index.js' },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    publicPath: 'http://localhost:8080/assets/',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.scss$/,
        use: ['style-loader', MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /.(ttf|otf|eot|svg|woff(2)?)(\?[a-z0-9]+)?$/,
        use: [{
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: 'fonts/',
          }
        }]
      }
    ]
  },
  plugins: [
    // new PurifyCSSPlugin({
    //   paths: glob.sync([
    //     path.join(__dirname, './*.js'),
    //     path.join(__dirname, './*.html')
    //   ]),
    //   minimize: true,
    // }),
    new MiniCssExtractPlugin({filename: '_[name].css'}),
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    watchContentBase: true,
    compress: true,
    port: 8080,
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
  },
};