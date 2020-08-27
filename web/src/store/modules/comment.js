import comment from '../../API/comment'
const state = {
    commentList: {},
    commentPage: null
};
const mutations = {
    SET_COMMENT_LIST(state, data) {
        state.commentList = data;
    },
    // 设置评论页码
    SET_COMMENT_PAGE(state, data) {
        state.commentPage = data;
    },
    UPDATE_COMMENT() { }
};
const actions = {
    async create({ commit }, params) {
        let res = await comment.create(params);
        commit('UPDATE_COMMENT', res);
        return res;
    },
     //获取该文章目标下的评论列表
    async getTargetComments({commit},params){
        console.log(params);
        let res = await comment.targetList(params)
        commit('UPDATE_COMMENT', res);
        return await res;
  }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}