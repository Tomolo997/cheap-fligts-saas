const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = {
  entry: path.resolve(__dirname, 'app/client/public/index.js'),
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'app.bundled.js',
  },

  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|jpg|gif)$/,
        use: 'file-loader',
      },
      {
        test: /\.svg$/,
        exclude: /node_modules/,
        loader: 'svg-react-loader',
      },
      {
        test: /\.(png|jp(e*)g|svg|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: 'images/[hash]-[name].[ext]',
            },
          },
        ],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './app/client/public/index.html',
      favicon: './app/client/public/favicon.ico',
    }),
  ],
  devServer: {
    publicPath: '/',
    contentBase: '/',
    historyApiFallback: true,
    hot: true,
    overlay: true,
    port: 4000,
    inline: true,
    open: 'http://localhost:4000',
  },
};

module.exports = config;
