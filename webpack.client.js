const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');

const config = {
  // root file of server,
  entry: './src/client/client.js',
  // where to put the bundle
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public')
  }
};

module.exports = merge(baseConfig, config);
