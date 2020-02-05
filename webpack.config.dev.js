const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const devServer = require('./webpack-dev-server.js');

const SOURCE_DIR = path.resolve(__dirname, 'src');
const CONFIG_DIR = path.resolve(__dirname, 'config');
const OUTPUT_DIR = path.resolve(__dirname, 'build');
const PUBLIC_DIR = '/';
const INDEX_FILE_TPL = path.resolve(__dirname, 'index.html');


module.exports = {
  devServer,
  entry: `${SOURCE_DIR}/index.js`,
  output: {
    filename: '[name].js',
    path: OUTPUT_DIR,
    publicPath: PUBLIC_DIR,
  },
  devtool: 'inline-source-map',
  plugins: [
    new ExtractTextPlugin('[name].css'),
    new HtmlWebpackPlugin({ template: INDEX_FILE_TPL }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor'],
      minChunks: ({ context }) => (
        context && context.indexOf('node_modules') !== -1
      ),
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader'],
        include: [SOURCE_DIR, CONFIG_DIR],
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          use: [
            'css-loader?sourceMap',
            'postcss-loader?sourceMap',
            'resolve-url-loader?sourceMap',
            'sass-loader?sourceMap',
          ],
          fallback: 'style-loader?sourceMap',
        }),
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          use: [
            'postcss-loader?sourceMap',
            'css-loader?sourceMap',
          ],
          fallback: 'style-loader?sourceMap',
        }),
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['file-loader'],
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/,
        use: ['file-loader?limit=100000'],
      },
      {
        test: /\.(mp4|vtt)$/,
        use: ['file-loader'],
      },
      {
        test: /\.(ics)$/,
        use: 'raw-loader',
      },
    ],
  },
};
