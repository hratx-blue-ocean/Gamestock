const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'client', 'App.jsx'),
  module: {
    rules: [
      {
        test: [/\.jsx$/],
        exclude: /node_modules/,
        use:
          {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react', '@babel/preset-env'],
            },
          },
      },
      {
        test: [/\.css?/i],
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
};