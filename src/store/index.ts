import Vue from "vue";
import Vuex from "vuex";
import editor from "./modules/editor";
import app from "./modules/app";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    app,
    editor
  }
});
