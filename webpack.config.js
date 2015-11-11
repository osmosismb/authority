var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, '/src/js'),
  target: 'web',
  entry: {
    app: './index.jsx'
  },
  output: {
    filename: 'app.min.js',
    path: path.join(__dirname, '/httpdocs')
  },
  module: {
    loaders: [{
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        query: {
          presets: ['es2015', 'react']
        }
    }]
  },
  resolve: {
    extensions: ['', '.js', '.jsx']
  },
  plugins: [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false
      }
    })
  ]
};
