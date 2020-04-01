module.exports = {
  mode: 'production',
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
            ]
          ],
          plugins: ['@babel/plugin-proposal-class-properties']
        }
      }
    ]
  }
};
