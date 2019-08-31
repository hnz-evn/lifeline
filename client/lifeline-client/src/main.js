import Vue from 'vue';
import toasted from './plugins/toasted';
import 'bulma/css/bulma.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.config.productionTip = false;
Vue.use(toasted);

new Vue({
  router,
  store,
  render(func) { return func(App); },
}).$mount('#app');
