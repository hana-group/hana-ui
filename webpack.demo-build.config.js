const path = require('path');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// remove webpack-loader confused warning: https://github.com/webpack/loader-utils/issues/56
process.noDeprecation = true;

module.exports = {
  entry: {
    main: './demo/src/index.js',
    'react-vendor': ['react', 'react-dom', 'react-router', 'react-transition-group', 'react-docgen'],
    'syntax-vendor': ['highlight.js/lib/highlight', 'highlight.js/lib/languages/javascript', 'highlight.js/lib/languages/bash', 'esprima', 'recast']
  },

  output: {
    path: path.resolve(__dirname, 'demo'),
    filename: '[name].js',
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
    new ExtractTextPlugin({
      filename: 'main.css',
      allChunks: true
    }),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['react-vendor', 'syntax-vendor'],
      minChunks: 2
    })
  ],

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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader'
            },
            {
              loader: 'postcss-loader'
            },
            {
              loader: 'sass-loader'
            },
            {
              loader: 'sass-resources-loader',
              options: {
                resources: './themes/default.scss'
              }
            }
          ]
        }),
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
      },
      {
        test: /\.woff|\.woff2|\.eot|\.ttf|\.svg/,
        use: {
          loader: 'url-loader',
          options: {
            // limit: 80000
          }
        }
      }
    ]
  }
};
