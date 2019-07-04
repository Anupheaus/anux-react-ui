/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const webpack = require('webpack');
const NotifierPlugin = require('webpack-build-notifier');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const chalk = require('chalk');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const title = 'Anux - React - UI';

module.exports = {
  entry: {
    index: path.resolve(__dirname, './src/index'),
  },
  mode: 'production',
  devtool: 'source-map',
  target: 'node',
  output: {
    path: path.resolve(__dirname, './dist'),
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js'],
  },
  module: {
    rules: [
      {
        test: /(?<!\.tests)\.tsx?$/,
        loader: 'ts-loader',
        options: {
          onlyCompileBundledFiles: true,
          compilerOptions: {
            declaration: true,
            declarationDir: './dist',
          }
        },
      },
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
    }),
    new NotifierPlugin({
      title,
      suppressCompileStart: false,
      sound: false,
    }),
    new ProgressBarPlugin({
      format: chalk`  building {blueBright ${title}} [:bar] {green :percent}`,
    }),
  ],
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
  // node: {
  //   __dirname: true,
  //   fs: 'empty',
  //   path: 'empty',
  // },
};
