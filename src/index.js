import Vue from 'vue';
import routes from './routes';
import './components/main.css';

new Vue({
  el: '#app',
  computed: {
    ViewComponent () {
      const matchingView = routes[window.location.pathname.split('.html')[0]]; // remove .html

      return matchingView ? matchingView : routes.NOTFOUND;
    }
  },
  render (h) {
    // return h(error404)
    return h(this.ViewComponent);
  }
});
