import admin from '../../API/admin'
const state = {
  userInfo: null
};
const mutations = {
  SET_USER_INFO(state, user) {
    state.userInfo = user;
  },
  SET_ASAS(){}
};
const actions = {
  async adminLogin({commit}, params) {
    let res = await admin.login(params);
    commit('SET_ASAS', res);
    return res;
  },
  async adminAuth({commit}, params) {
    let res = await admin.getUser(params);
    commit('SET_USER_INFO', res.data.nickname);
    return res;
  }
};
export default {
  // 命名空间
  namespaced: true,
  state,
  mutations,
  actions
}