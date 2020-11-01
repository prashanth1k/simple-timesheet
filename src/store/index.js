import Vue from "vue";
import Vuex from "vuex";

import VuexPersistence from "vuex-persist";

import daystr from "./daystr";

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  storage: window.localStorage,
});

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: { daystr },
  plugins: [vuexLocal.plugin],
});
