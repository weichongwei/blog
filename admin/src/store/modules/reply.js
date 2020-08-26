import reply from '../../api/reply'
const state = {};
const mutations = {};
const actions = {
  async getReplyListByCommentId({commit},params){
    let res = await reply.list(params)
        //console.log(res);
    return res;
  },
  async destroyReply({commit},params){
    let res = await reply.destroy(params);
        //console.log(res);
    return res;
  }
};
export default {
  namespaced: true,
  state,
  mutations,
  actions
}