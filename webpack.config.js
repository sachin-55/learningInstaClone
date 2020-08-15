const HtmlWebPackPlugin = require('html-webpack-plugin');
const path = require('path');
const Fiber = require('fibers');
const webpack = require('webpack');
const dotenv = require('dotenv');
const CopyPlugin = require('copy-webpack-plugin');

// const env = dotenv.config({ path: `${__dirname}/config.env` }).parsed;
const env = dotenv.config({ path: `${__dirname}/.env` }).parsed;

// reduce it to a nice object, the same as before
const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});
module.exports = () => {
  return {
    entry: [
      './index.js', // Your appʼs entry point
    ],
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'index_bundle.js',
      publicPath: '/',
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
            },
          ],
        },
        {
          test: /\.(s[ac]ss|css)$/,
          use: [
            { loader: 'style-loader' },
            {
              loader: 'css-loader',
            },
            {
              loader: 'sass-loader',
              options: {
                implementation: require('dart-sass'),
                sassOptions: {
                  fiber: Fiber,
                },
              },
            },
          ],
        },
        {
          test: /\.(woff(2)?|ttf|eot|svg|png|jpe?g|gif)$/i,
          use: [
            {
              loader: 'file-loader',
            },
          ],
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg)$/,
          use: {
            loader: 'url-loader',
          },
        },
      ],
    },
    mode:
      process.env.NODE_ENV === 'production'
        ? 'production'
        : 'development',

    plugins: [
      new HtmlWebPackPlugin({
        template: './index.html',
        filename: 'index.html',
      }),
      new CopyPlugin({
        patterns: [
          {
            from: '_redirects',
          },
        ],
      }),
      new webpack.DefinePlugin(envKeys),
    ],
    devServer: {
      contentBase: './build',
      host: 'localhost',
      port: process.env.PORT,
      historyApiFallback: true,
      open: true,
      hot: true,
      inline: true,
    },
  };
};
