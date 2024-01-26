const path = require('path');
const HtmlBundlerPlugin = require('html-bundler-webpack-plugin');

const config = {
  mode: 'development',
  devtool: 'inline-source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  plugins: [
    new HtmlBundlerPlugin({
      entry: 'src/',
      js: {
        // output filename of extracted JS from source script loaded in HTML via `<script>` tag
        filename: 'assets/js/[name].[contenthash:8].js',
      },
      css: {
        // output filename of extracted CSS from source style loaded in HTML via `<link>` tag
        filename: 'assets/css/[name].[contenthash:8].css',
      },
    }),
  ],
  module: {
    rules: [
      {
          test: /\.(js|jsx)$/i,
          loader: 'babel-loader',
      },
      {
        test: /\.css$/i,
        use: ['css-loader'],
      },
      {
          test: /\.s[ac]ss$/i,
          use: ['css-loader', 'sass-loader'],
      },
      {
        test: /\.(ico|png|jp?g|gif|svg)/,
        type: 'asset/resource',
        generator: {
          filename: 'img/[name].[hash:8][ext]',
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/i,
        type: 'asset',
      },
    ],
  },
  // enable HMR with live reload
  devServer: {
    compress: true,
    host: '0.0.0.0',
    open: true,
    static: path.resolve(__dirname, 'dist'),
    watchFiles: {
      paths: ['src/**/*.*'],
      options: {
        usePolling: true,
      },
    },
  },
};

module.exports = config;
