import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    accessToken: localStorage.getItem('accessToken'),
  },
  getters: {
    isAuthenticated: state => state.accessToken,
  },
  mutations: {
    setAccessToken(state, { token }) {
      state.accessToken = token;
    },
  },
  actions: {

  },
});
