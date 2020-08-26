import comments from '../../api/comments'
const state = {};
const mutations = {};
const actions = {
  async getCommentList({commit},params){
    let res = await comments.list(params)
        //console.log(res);
    return res;
  },
  async destroyComment({commit},params){
    let res = await comments.destroy(params);
        console.log(res);
    return res;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
}