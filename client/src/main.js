import Vue from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faHeartbeat } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import 'bulma/css/bulma.css';

import App from './App.vue';
import toasted from './plugins/toasted';
import router from './router';
import store from './store';
import './registerServiceWorker';

library.add(faHeartbeat);

Vue.use(toasted);

Vue.component('font-awesome-icon', FontAwesomeIcon);

// TODO: Should remove in the future...
window.$APP = new Vue({
  router,
  store,
  render(func) { return func(App); },
}).$mount('#app');
