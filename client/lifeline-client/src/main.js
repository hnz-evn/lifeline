import Vue from 'vue';
import Toasted from 'vue-toasted';
import 'bulma/css/bulma.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(Toasted);

new Vue({
  router,
  store,
  render(func) { return func(App); },
}).$mount('#app');
