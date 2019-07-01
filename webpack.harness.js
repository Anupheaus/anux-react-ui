/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const NotifierPlugin = require('webpack-build-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const NodemonPlugin = require('nodemon-webpack-plugin');
const chalk = require('chalk');

const outputPath = path.resolve(__dirname, './tests/harness');
const title = 'Anux - React - UI - Harness';
const index = './harness.html';
const entryPoint = path.resolve(outputPath, './harness.tsx');

module.exports = {
  context: __dirname,
  entry: {
    index: entryPoint,
  },
  mode: 'development',
  devtool: 'source-map',
  target: 'web',
  output: {
    path: outputPath,
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.pug$/,
        use: [
          'html-loader',
          'pug-html-loader'
        ]
      },
      {
        test: /(?<!\.tests)\.tsx?$/,
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true,
        },
      },
    ]
  },
  plugins: [
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
    }),
    new HtmlWebPackPlugin({
      template: path.resolve(outputPath, './harness.pug'),
      filename: path.resolve(outputPath, index),
      inject: 'head',
    }),
    new webpack.HotModuleReplacementPlugin(),
    new NotifierPlugin({
      title,
      suppressCompileStart: false,
      sound: false,
    }),
    new ProgressBarPlugin({
      format: chalk`  building {blueBright ${title}} [:bar] {green :percent}`,
    }),
  ],
  devServer: {
    contentBase: outputPath,
    compress: true,
    hot: true,
    index,
    port: 1234,
    stats: {
      errors: true,
      timings: true,
      assets: false,
      cached: false,
      cachedAssets: false,
      children: false,
      chunks: true,
      chunkModules: false,
      chunkOrigins: false,
      colors: true,
      hash: false,
      modules: false,
      moduleTrace: false,
      performance: false,
      publicPath: false,
      reasons: false,
      source: false,
      version: false,
      warnings: false,
    },
  },
  node: {
    __dirname: true,
    fs: 'empty',
    path: 'empty',
  },
};
