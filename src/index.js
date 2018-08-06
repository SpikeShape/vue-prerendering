import Vue from 'vue';
import routes from './routes.private';
import './components/main.css';

const files = require.context('./components/app/icon/img', false, /.*\.svg$/);
files.keys().forEach(files);

new Vue({
  el: '#app',
  computed: {
    ViewComponent () {
      const matchingView = routes[window.location.pathname.split('.html')[0]]; // remove .html

      return matchingView ? matchingView : routes[404];
    }
  },
  render (h) {
    // return h(error404)
    return h(this.ViewComponent);
  }
});
