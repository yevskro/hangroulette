const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: "./client/src/index.js",
  mode: "development",
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "bundle.js",
    publicPath: "/"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loader: "babel-loader",
        options: { presets: ["@babel/env"] }
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"]
      },
      {
        test: /\.(jpg|svg)$/i,
        loader: "url-loader"
      },
      {
        test: /\.ttf$/,
        loader: 'url-loader'
      }
    ]
  },
  devServer: {
    port: 3000,
    hot: true,
    open: true,
    proxy: {"/": "http://localhost:5000"},
    contentBase: path.resolve(__dirname, "public"),
    publicPath: "/"
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './client/public/index.html',
        inject: true
    })
  ]  
};