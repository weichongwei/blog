import article from '../../API/article'
const state = {
    articleList: []
};
const mutations = {
    SET_ARTICLE_LIST(state, list) {
        state.articleList = list
    }
};
const actions = {
    async list({ commit, state }, params) {
        if (state.articleList && state.articleList.length > 0) {
            return state.articleList;
        }
        let res = await article.list(params);
        let data = res.data.data;
        commit('SET_ARTICLE_LIST', data)
        return data
    },
    async detail({commit},params){       
        let res = await article.detail(params);
        //console.log(res);
        let data = res.data.data;
        //console.log(data);
        commit('SET_ARTICLE_LIST', data)
        return data;
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}