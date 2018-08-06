import Vue from 'vue';
import routes from './routes.private';
import './components/main.css';

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
