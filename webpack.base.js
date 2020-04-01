module.exports = {
  mode: 'development',
  devServer: {
    contentBase: './build',
    hot: true
  },
  module: {
    rules: [
      {
        test: /\.js?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: [
            [
              '@babel/env',
              {
                targets: {
                  browsers: ['last 2 versions']
                }
              }
            ],
            '@babel/preset-react'
          ],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    ]
  }
};
