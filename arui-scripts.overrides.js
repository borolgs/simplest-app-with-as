const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const webpack = require('webpack');

module.exports = {
  webpackClient: (config) => {
    config.output.path = path.resolve(__dirname, 'build');
    config.output.publicPath = './';
    config.output.filename = '[name].[hash].js';
    config.output.chunkFilename = '[name].[hash].js';

    const manifestPlugin = config.plugins.find((plugin) => {
      return plugin.opts && plugin.opts.fileName === 'manifest.json';
    });
    manifestPlugin
      ? (manifestPlugin.opts.fileName = 'asset-manifest.json')
      : config.plugins.push(
          new WebpackManifestPlugin({
            fileName: './asset-manifest.json',
          })
        );

    config.plugins.push(
      new HTMLWebpackPlugin({
        template: './src/index.html',
      }),
      new webpack.DefinePlugin({
        BUILD_VERSION: JSON.stringify(`v${process.env.npm_package_version}`),
        'process.env': {
          CONTEXT_ROOT: JSON.stringify(process.env.CONTEXT_ROOT),
        },
      })
    );

    return config;
  },
  devServer: (config) => {
    config.contentBase = path.resolve(__dirname, 'build');
    config.publicPath = '';
    return config;
  },
};
