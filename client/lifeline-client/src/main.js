import Vue from 'vue';
import toasted from './plugins/toasted';
import 'bulma/css/bulma.css';

import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

Vue.use(toasted);

// TODO: Should remove in the future...
window.$APP = new Vue({
  router,
  store,
  render(func) { return func(App); },
}).$mount('#app');
