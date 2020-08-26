import Vue from "vue";
import Vuex from "vuex";
import admin from './modules/admin'
import advertise from './modules/advertise'
import category from './modules/category'
import article from './modules/article'
import comment from './modules/comment'
import reply from './modules/reply'
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    admin,
    advertise,
    category,
    article,
    comment,
    reply
  }
})