const path = require('path');
const fs = require('fs');
const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CompressionPlugin = require('compression-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

const outPath = path.resolve(__dirname, 'demo/dist');
const outHtml = fs.readFileSync(path.resolve(__dirname, './demo/index.html'), 'utf8')
  .split('\n').filter(line => !/((main|vendor)\.(js|css))/g.test(line))
  .join('\n');

// remove webpack-loader confused warning: https://github.com/webpack/loader-utils/issues/56
process.noDeprecation = true;

module.exports = {
  entry: {
    main: './demo/src/index.js',
    'react-vendor': ['react', 'react-dom', 'react-router', 'react-transition-group', 'react-docgen'],
    'syntax-vendor': ['highlight.js/lib/highlight', 'highlight.js/lib/languages/javascript', 'highlight.js/lib/languages/bash', 'esprima', 'recast']
  },

  output: {
    path: outPath,
    filename: '[name].[hash].js',
    publicPath: '/demo'
  },

  resolve: {
    extensions: ['.js', '.jsx', '.json', '.md'],
    alias: {
      'hana-ui': path.resolve(__dirname, './src/'),
      demo: path.resolve(__dirname, './demo/src/components')
    }
  },

  plugins: [
    new CleanWebpackPlugin(
      ['*'],
      {root: outPath}
    ),
    new ExtractTextPlugin({
      filename: 'main.[hash].css',
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
    }),
    new HtmlWebpackPlugin({
      templateContent: outHtml
    }),
    new CompressionPlugin({
      asset: '[path]',
      algorithm: 'gzip',
      test: /\.js$|\.css$/,
      threshold: 10240,
      minRatio: 0.8
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
