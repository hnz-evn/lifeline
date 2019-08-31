import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('accessToken'),
  },
  mutations: {
    setAccessToken(state, { token }) {
      state.accessToken = token;
    },
  },
  actions: {

  },
});
