import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/login',
      name: 'Login',
      component() {
        return import(/* webpackChunkName: "about" */ './views/Login.vue');
      },
    },
    {
      path: '/',
      name: 'Main',
      component() {
        return import(/* webpackChunkName: "about" */ './views/Main.vue');
      },
    },
  ],
});
