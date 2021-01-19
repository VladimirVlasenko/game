

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin');
const isDev = process.env.NODE_ENV === 'development';
const isProd = !isDev;
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: {
    bundle: './src/js/index.js',
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [new HtmlWebpackPlugin({
    title: 'project sample',
    filename: 'index.html',
    template: path.resolve(__dirname, 'src/index.html'),
    minify: {
      collapseWhitespace: isProd
    }
  }),
  new CleanWebpackPlugin({
    dry: true,
  }),
  new CopyPlugin({
    patterns: [{
      from: 'src/assets/images',
      to: 'assets/images'
    },
    {
      from: 'src/assets',
      to: 'assets'
    }
  ],
  }),
  ],
  devtool: isProd ? false : 'source-map',
  module: {
    rules: [{
      test: /\.m?js$/,
      exclude: /node_modules/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ['@babel/preset-env']
        }
      }
    },
    {
      test: /\.css$/i,
      use: ['style-loader', 'css-loader'],
    },
    {
      test: /\.less$/i,
      use: ['style-loader', 'css-loader', 'less-loader'],
    },
    {
      test: /\.s[ac]ss$/i,
      use: ['style-loader', 'css-loader', 'sass-loader'],
    },
    {
      test: /\.(woff|woff2|eot|ttf|otf)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'fonts',
          name: '[name].[ext]',
        }
      },
      ],
    },
    {
      test: /\.(png|jpeg|jpg|gif)$/i,
      use: [{
        loader: 'file-loader',
        options: {
          outputPath: 'assets/images',
          name: '[name].[ext]',
        }
      }, ],
    },
    ],
  },
  devServer: {
    port: 3000,
    open: true,
    hot: true,
  }
};
