const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const PrerenderSpaPlugin = require('prerender-spa-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const localconfig = require('./localconf');

const paths = {
  SRC: path.resolve(__dirname, './src'),
  DIST: path.resolve(__dirname, './dist'),
};

module.exports = {

  entry: {
    bundle: './src/index.js',
    main: './src/components/main.js',
  },
  output: {
    path: paths.DIST,
    publicPath: '/',
    filename: 'assets/js/[name].js'
  },
  plugins: [
    new CleanWebpackPlugin('dist', {
      root: process.cwd()
    }),
    new ExtractTextPlugin('./assets/styles/styles.css'),
    new CopyWebpackPlugin([
      { // styling images
        from: path.join(paths.SRC, 'components/**/*.png'),
        to: path.join(paths.DIST, 'assets/img/'),
        flatten: true
      },
      { // content images
        from: path.join(paths.SRC, 'img/*.*'),
        to: path.join(paths.DIST, 'img/'),
        flatten: true
      }
    ], {
      copyUnmodified: true
    }),
    new SpriteLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract({
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 1
              }
            },
            'postcss-loader'
          ]
        })
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          loaders: {
          }
          // other vue-loader options go here
        }
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]?[hash]'
        }
      },
      {
        test: /\.svg$/,
				include: path.join(paths.SRC, 'components/app/icon/img/'),
        use: [
          {
            loader: 'svg-sprite-loader',
            options: {
              extract: true,
              spriteFilename: '/assets/img/svg-sprite.svg',
            }
          }
        ]
      }
    ]
  },
  resolve: {
    alias: {
      'vue$': 'vue/dist/vue.esm.js',
      // JQuery: './node_modules/jquery/dist/jquery.min.js',
    },
    extensions: ['*', '.js', '.vue', '.json']
  },
  devServer: {
    contentBase: paths.SRC,
    historyApiFallback: true,
    noInfo: true,
    overlay: true,
    port: localconfig.devServerPort
  },
  performance: {
    hints: false
  },
  devtool: '#eval-source-map'
}

if (process.env.NODE_ENV === 'production') {
  const Renderer = PrerenderSpaPlugin.PuppeteerRenderer;
  const publicRoutes = require('./src/routes.public');

  module.exports.devtool = '#source-map'
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.DefinePlugin({
        'process.env': {
        NODE_ENV: '"production"'
      }
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    }),
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
      inject: false
    }),
    new PrerenderSpaPlugin({
      staticDir: paths.DIST,
      routes: publicRoutes,
      postProcess (renderedRoute) {
        // Remove /index.html from the output path if the dir name ends with a .html file extension.
        // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
        if (renderedRoute.route.endsWith('.html')) {
          renderedRoute.outputPath = path.join(__dirname, 'dist', renderedRoute.route)
        }

        return renderedRoute
      },
      renderer: new Renderer({
        executablePath: localconfig.chromeExecutable,
        // slowMo: 1000,
        // headless: false
      })
    })
  ])
}
