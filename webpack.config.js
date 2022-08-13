/*******************************************************************************
The MIT License (MIT)

Copyright (c) 2015 Logan Barnett (logustus@gmail.com)

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
*******************************************************************************/
const { mergeRight, append } = require('ramda')
const autoprefixer = require('autoprefixer')
// const cssNext = require('postcss-cssnext')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require("mini-css-extract-plugin")
const path = require('path')
const webpack = require('webpack')

const bareJsRule = require('./webpack.js-config.js')
const jsRule = mergeRight(
  bareJsRule,
  { exclude: append(/\.gen\.js$/, bareJsRule.exclude) },
)

module.exports = {
  devtool: 'source-map',
  devServer: require('./webpack-dev-server.config.js'),
  context: path.join(__dirname, 'client'),
  entry: [
    // 'webpack/hot/dev-server',
    // 'webpack-hot-middleware/client',
    './app.tsx',
  ],
  mode: 'production',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
    // publicPath: '/app/', // default but need to provide value for browser-sync
    publicPath: '/',
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      template: 'index.html',
      filename: 'index.html',
      inject: true,
    }),
    new webpack.HotModuleReplacementPlugin(),
    // Prevent Webpack from rebuilding when the css.d.ts files are written out.
    new webpack.WatchIgnorePlugin({
      paths: [/css\.d\.ts$/],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
            },
          },
          {
            loader: 'css-modules-typescript-loader',
            options: {
              mode: process.env.CI ? 'verify' : 'emit'
            }
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 0,
              modules: {
                localIdentName: '[name]__[local]__[hash:base64:5]',
              },
              sourceMap: true,
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              sourceMap: true,
              postcssOptions: {
                plugins: [
                  autoprefixer(),
                ],
              },
            },
          },
        ],
      },
      jsRule,
      {
        test: /\.schema\.json$/,
        use: [
          {
            loader: 'ajv-json-loader',
            options: {
              ajv: {
                // Pass any Ajv constructor options here.
                allErrors: true,
              }
            }
          }
        ],
        // "type" option only for Webpack >= 4
        // (https://webpack.js.org/configuration/module/#ruletype)
        type: "javascript/auto"
      },
      {
        test: /\.html$/,
        exclude: /index\.html$/,
        use: {
          loader: 'html-loader',
          options: {
            // minimize: false,
            // removeComments: false,
            // collapseWhitespace: false,
          },
        },
      },
      {
        test: /\.(svg|jpe?g|png)$/,
        use: {
          loader: 'url-loader',
          options: {
            prefix: '/assets/images',
            name: 'assets/images/[name].[ext]',
            limit: 1000,
          },
        },
      },
      {
        test: /\.(woff|woff2|eot|ttf)$/,
        use: {
          loader: 'url-loader',
          options: {
            prefix: 'font',
            limit: 1000,
          },
        },
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
  },
}
