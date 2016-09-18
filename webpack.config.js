const path = require('path');

const dependencies = [
  'axios',
  'react',
  'react-dom',
  'react-router',
];

module.exports = {
  entry: {
    app: './client/app/app.js',
    vendor: dependencies,
  },
  output: {
    path: './client/build/js',
    filename: '[name].js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    alias: {
      react: path.join(__dirname, './', 'node_modules', 'react'),
    },
    extensions: ['', '.js', '.jsx'],
  },
  plugins: [],
};
