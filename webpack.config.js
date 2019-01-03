const path = require('path');
const webpack = require('webpack');

const CleanWebpackPlugin = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlReplaceWebpackPlugin = require('html-replace-webpack-plugin');
const SpriteLoaderPlugin = require('svg-sprite-loader/plugin');

const { VueLoaderPlugin } = require('vue-loader');
const CopyWebpackPlugin = require('copy-webpack-plugin');

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
    new HtmlWebpackPlugin({
      template: path.join(paths.SRC, 'index.html'),
      inject: false
    }),
    new MiniCssExtractPlugin({
      filename: './assets/styles/styles.css'
    }),
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
    new SpriteLoaderPlugin(),
    new VueLoaderPlugin()
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          'postcss-loader'
        ]
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          transformAssetUrls: {
            // use for vector:src
            vector: 'src',
          },
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
      },
      {
      test: /\.svg$/,
        exclude: path.join(paths.SRC, 'components/app/icon/img/'),
        loader: 'svg-inline-loader',
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
};

if (process.env.NODE_ENV === 'development') {
  module.exports.mode = 'development';
  module.exports.plugins = (module.exports.plugins || []).concat([
    new HtmlReplaceWebpackPlugin([
      {
        pattern: /<!-- nojs test -->/i,
        replacement: `<script type="text/javascript">
                        var html_node = document.getElementsByTagName("html")[0];
                        html_node.className =
                        html_node.className.replace( /(?:^|\\s)no-js(?!\\S)/g , ' js');
                      </script>`
      },
      {
        pattern: /<!-- main js -->/i,
        replacement: `<script src="/assets/js/main.js"></script>`
      }
    ])
  ]);
}

if (process.env.NODE_ENV === 'production') {
  const PrerenderSpaPlugin = require('prerender-spa-plugin');
  const Renderer = PrerenderSpaPlugin.PuppeteerRenderer;
  const publicRoutes = require('./src/routes.public');
  const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

  module.exports.mode = 'production';
  module.exports.devtool = '#source-map';
  // http://vue-loader.vuejs.org/en/workflow/production.html
  module.exports.optimization = {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        sourceMap: true // set to true if you want JS source maps
      })
    ]
  };
  module.exports.plugins = (module.exports.plugins || []).concat([
    new webpack.LoaderOptionsPlugin({
      minimize: true
    }),
    new PrerenderSpaPlugin({
      staticDir: paths.DIST,
      routes: publicRoutes,
      postProcess (context) {
        let html_content = context.html;

        html_content = html_content.replace(
          /<!-- nojs test -->/i,
          `<script type="text/javascript">
            var html_node = document.getElementsByTagName("html")[0];
            html_node.className =
            html_node.className.replace( /(?:^|\\s)no-js(?!\\S)/g , ' js');
          </script>`
        );

        html_content = html_content.replace(
          /<script src="\/assets\/js\/bundle\.js"><\/script>/i,
          ''
        );

        html_content = html_content.replace(
          /<!-- main js -->/i,
          '<script src="/assets/js/main.js"></script>'
        );

        context.html = html_content;

        // Remove /index.html from the output path if the dir name ends with a .html file extension.
        // For example: /dist/dir/special.html/index.html -> /dist/dir/special.html
        if (context.route.endsWith('.html')) {
          context.outputPath = path.join(__dirname, 'dist', context.route)
        }

        return context;
      },
      renderer: new Renderer({
        executablePath: localconfig.chromeExecutable,
        // slowMo: 1000,
        // headless: false
      })
    })
  ])
}
