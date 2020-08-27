import Vue from "vue";
import Vuex from "vuex";

import category from './modules/category'
import article from './modules/article'
import comment from './modules/comment'
import reply from './modules/reply'
import advertise from './modules/advertise'
import admin from './modules/admin'

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},
  mutations: {},
  actions: {},
  modules: {
    category,
    article,
    comment,
    reply,
    advertise,
    admin
  }
});
