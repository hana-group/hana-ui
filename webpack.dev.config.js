const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const {PORT, HOST} = require('./server.dev');

module.exports = {
  devtool: 'source-map',
  mode: 'development',
  entry: {
    main: [
      'react-hot-loader/patch',
      './demo/src/index.js'
    ]
  },
  output: {
    publicPath: '/',
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[hash].js'
  },
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
        test: /\.jsx?/,
        use: [
          {
            loader: 'babel-loader'
          }
        ],
        exclude: /(node_modules)/
      },
      {
        test: /\.(css|sass|scss)$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader
          },
          {
            loader: 'css-loader'
          },
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                plugins: [
                  ['postcss-preset-env'],
                ],
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
        test: /\.(woff|woff2|eot|ttf|svg|jpg|png)$/,
        type: 'asset/resource',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({filename: 'main.[hash].css'}),
    new webpack.ProvidePlugin({}),
    new NodePolyfillPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('development'),
        BROWSER: JSON.stringify(true)
      }
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './demo/index.html')
    })
  ],

  devServer: {
    host: HOST,
    port: PORT,
    hot: true,
    client: {
      overlay: false,
    },
    historyApiFallback: true,
    proxy: [{
      context: ['/upload', '/demo/'],
      target: `http://localhost:${PORT + 1}`
    }]
  }
};
