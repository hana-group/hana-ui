const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// remove webpack-loader confused warning: https://github.com/webpack/loader-utils/issues/56
process.noDeprecation = true;

module.exports = {
  entry: './server.pd.js',

  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: 'server.js',
    publicPath: '/'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.md'],
    alias: {
      'hana-ui': path.resolve(__dirname, './src/'),
      demo: path.resolve(__dirname, './demo/src/components')
    }
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
          NODE_ENV: JSON.stringify('production')
      }
    })
  ],

  target: 'node',

  node: {
    __filename: true,
    __dirname: true
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.css|sass|scss$/,
        use: [
          {
            loader: 'ignore-loader'
          }
        ],
        exclude: /node_modules/
      },
      {
        test: /\.txt$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ],
        include: path.resolve(__dirname, 'demo/src/components/raw-code')
      },
      {
        test: /\.md$/,
        use: [
          {
            loader: 'raw-loader'
          }
        ]
      },
      {
        test: /\.json/,
        use: [
          {
            loader: 'json-loader'
          }
        ]
      }
    ]
  }
};
