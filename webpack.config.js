const path = require('path');

module.exports = {
    mode: 'development',
    devtool: 'source-map',
    entry: './public/scripts/main.js',
    output: {
        filename: 'main.js',
        path: path.join(__dirname, 'public/out')
    },
    module: {
      rules: [
        {
          test: /\.m?js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env']
            }
          }
        }
      ]
    }
};
