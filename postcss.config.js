module.exports = {
  plugins: [
    require('postcss-mixins'),
    require('postcss-nested'),
    require("postcss-calc")({
      mediaQueries: true,
      selectors: true
    }),
    require('postcss-preset-env')({
      browsers: 'last 2 versions'
    }),
    require('rucksack-css'),
    require("css-mqpacker")({
      sort: true
    }),
    require('cssnano')({
      autoprefixer: false,
      safe: true
    })
  ]
}
