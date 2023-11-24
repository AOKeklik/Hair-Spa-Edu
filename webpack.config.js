const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

module.exports = {
    mode: 'development',
    entry: {
      bundle: path.resolve(__dirname, 'src/js/index.js'),
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name][contenthash].js',
      clean: true,
      assetModuleFilename: 'assets/[name][ext]',
    },
    module: {
      rules: [
        {
            // HTML LOADER
            test: /\.html$/,
            loader: 'html-loader'
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader', 'sass-loader'],
        },
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
            },
          },
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif)$/i,
          type: 'asset/resource',
        }
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        title: 'Webpack App',
        filename: 'index.html',
        template: 'src/index.html',
      })
    ],
  }