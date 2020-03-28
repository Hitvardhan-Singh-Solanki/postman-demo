const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
const nodeExternals = require('webpack-node-externals');

const config = {
    // Inform webpack we are building for node js
    target: 'node',
    // root file of server,
    entry: './src/index.js',
    // where to put the bundle
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build')
    },
    externals: [nodeExternals()]
};

module.exports = merge(baseConfig, config);
