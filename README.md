# Vue prerendering

A frontend development toolchain to create component-based websites using Vue.js and Webpack.
While development is happening in real time using hot reloading the `build` task is used to export all specified website routes to static HTML, CSS and JavaScript files.


## Build Setup

``` bash
# install dependencies
yarn # npm install

# serve with hot reload at localhost to a custom port
yarn run dev # npm run dev

# pre-render html files and save them to ./dist folder
yarn run build # npm run build
```

## Configuration

Duplicate `./localconf.template.js`, name it `./localconf.js` and change the settings to your liking.

| option        |  what it does  | further details |
| ------------- | -- | -- |
| chromeExecutable | Local Chrome (or Chromeium) executable used to render all pages | must be absolute |
| devServerPort | The port your page will be served to when running the dev task |  |


## Routes

There are two files to manage the website routes:

| option        |  what it does  |
| ------------- | -- |
| ./routes.private.js | Maps URL paths (without .html) to .vue files located in `./src/pages` |
| ./routes.public.js | Specifies the html pages the should be rendered when pre-rendering the page |
