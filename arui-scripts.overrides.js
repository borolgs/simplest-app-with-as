/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  webpackClientDev: (config) => {
    // config.optimization.runtimeChunk = 'single';
    config.output.publicPath = '/';

    return config;
  },
  webpackClient: (config, applicationConfig) => {
    config.output.path = path.resolve(__dirname, 'build');
    config.output.publicPath = 'auto';

    config.plugins.push(
      new HTMLWebpackPlugin({
        template: './src/index.html',
      })
    );

    return config;
  },
  devServer: (config) => {
    return {
      ...config,
      devMiddleware: {
        publicPath: '/',
      },
      proxy: {
        '/api/**': { target: 'http://localhost:3000' },
      },
      historyApiFallback: true,
    };
  },
};
