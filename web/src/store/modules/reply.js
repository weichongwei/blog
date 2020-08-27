import reply from '../../API/reply';
const state = {};
const mutations = {
    UPDATE_REPLY(){}
};
const actions = {
    async createReply({ commit }, params) {
        let res = await reply.create(params);
        commit('UPDATE_REPLY',res);
        return res;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}