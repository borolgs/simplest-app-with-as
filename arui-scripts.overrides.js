/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable @typescript-eslint/no-var-requires */
const path = require('path');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const ModuleFederationPlugin = require('webpack/lib/container/ModuleFederationPlugin');
const packageJsonDeps = require('./package.json').dependencies;

module.exports = {
  webpackClientDev: (config) => {
    // config.optimization.runtimeChunk = 'single';
    config.output.publicPath = 'auto';

    return config;
  },
  webpackClient: (config, applicationConfig) => {
    config.output.path = path.resolve(__dirname, 'build');
    config.output.publicPath = 'auto';

    config.plugins.push(
      new HTMLWebpackPlugin({
        template: './src/index.html',
      }),
      new ModuleFederationPlugin({
        name: 'host',
        shared: {
          react: {
            singleton: true,
            requiredVersion: packageJsonDeps.react,
          },
          'react-dom': {
            singleton: true,
            requiredVersion: packageJsonDeps['react-dom'],
          },
        },
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
        '/zalfa/**': {
          target: 'http://localhost:3001/',
          secure: false,
          changeOrigin: true,
        },
      },
    };
  },
};
