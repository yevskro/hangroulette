const path = require("path");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const OptimizeCssAssetsPlugin = require("optimize-css-assets-webpack-plugin");

module.exports = {
  entry: "./client/src/index.js",
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
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          compress: {
            comparisons: false
          },
          mangle: {
            safari10: true
          },
          output: {
            comments: false,
            ascii_only: true
          },
          warnings: false
        }
      }),
      new OptimizeCssAssetsPlugin()
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
        template: './client/public/index.html',
        inject: true
    })
  ]  
};