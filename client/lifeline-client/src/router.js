import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'main',
      component() {
        return import(/* webpackChunkName: "about" */ './views/Main.vue');
      },
    },
    {
      path: '/login',
      name: 'login',
      component() {
        return import(/* webpackChunkName: "about" */ './views/Login.vue');
      },
    },
  ],
});
