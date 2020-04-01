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
            'es2015',
            'react',
            'stage-0',
            [
              'env',
              {
                targets: {
                  browsers: ['last 2 versions']
                }
              }
            ]
          ],
          plugins: ['transform-class-properties']
        }
      }
    ]
  }
};
