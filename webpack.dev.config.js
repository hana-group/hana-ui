const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

// remove webpack-loader confused warning: https://github.com/webpack/loader-utils/issues/56
process.noDeprecation = true;

module.exports = {
  entry: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?/',
    'webpack/hot/dev-server',
    './demo/src/index.js'
  ],
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js'
  },
  // devtool: 'cheap-module-source-map',
  resolve: {
    extensions: ['.js', '.jsx', '.json', '.md'],
    alias: {
      'hana-ui': path.resolve(__dirname, './src/'),
      demo: path.resolve(__dirname, './demo/src/components')
    }
  },
  module: {
    rules: [
      {
        // enforce: 'pre',
        test: /\.jsx?/,
        use: [
          // {
          //   loader: 'react-hot-loader/webpack'
          // },
          {
            loader: 'babel-loader',
            options: {
              cacheDirectory: true
            }
          }
          // {
          //   loader: 'eslint-loader',
          // }
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: 'style-loader'
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              config: {
                path: path.resolve('./postcss.config.js')
              }
            }
          },
          {
            loader: 'sass-loader'
          },
          {
            loader: 'sass-resources-loader',
            options: {
              // resources: './themes/default.scss'
              resources: './themes/himawari.scss'
            }
          }
          // {
          //   loader: 'sasslint-loader'
          // }
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
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 100000
          }
        }
      }
    ]
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.ProvidePlugin({}),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BROWSER: JSON.stringify(true)
      }
    }),
    new HtmlWebpackPlugin({
      inject: true,
      template: path.resolve(__dirname, './demo/index.html')
    })
  ],
  performance: {
    hints: false
  }
};
