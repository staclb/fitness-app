import path from 'path';
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './client/index.tsx',
  mode: process.env.NODE_ENV,
  resolve: {
    extensions: ['.jsx', '.js', '.tsx', '.ts']
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },

  module: {
    rules: [
      {
        test: /.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env', '@babel/preset-react']
          }
        }
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /.(css|scss)$/,
        // exclude: [/node_modules/],
        use: ['style-loader', 'css-loader', 'postcss-loader']
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './client/index.html'
    })
  ],
  devServer: {
    host: 'localhost',
    port: 8080,
    hot: false,
    liveReload: false,
    historyApiFallback: true,
    static: {
      publicPath: '/build',
      directory: path.join(__dirname, './build')
    },
    proxy: {
      // TODO: change to route that you need
      '/api': {
        target: 'http://localhost:3000',
        secure: false
      }
    }
  }
};
