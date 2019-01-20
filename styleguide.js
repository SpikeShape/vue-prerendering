var StyleGuide = require('styleguidejs');
var sg = new StyleGuide();
sg.addFile("dist/assets/styles/styles.css");
sg.render({
  templateCss: "styleguide/template/styleguide.css",
  templateJs: "styleguide/template/styleguide.js",
  template: "styleguide/template/index.jade",
  beautifyHtml: {
    preserve_newlines: false // see https://www.npmjs.com/package/js-beautify
  },
  outputFile: "styleguide/dist//index.html"
});
