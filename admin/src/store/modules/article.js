import article from '../../api/article'
const state = {}
const mutations = {}
const actions = {
    // 获取文章列表
    async getArticleList({state,commit}, params) {
        let res = await article.list(params)
        //console.log(res);
        return res;
    },

    // 获取文章详情
    async getArticleDetail({state,commit}, params) {
        let res = await article.detail(params)
        //console.log(res);
        return res;
    },

    // 创建文章
    async createArticle({state,commit}, params) {
        let res = await article.create(params)
        //console.log(res);
        return res;
    },
    // 更新文章
    async updateArticle({state,commit}, params) {
        let res = await article.update(params)
        //console.log(res);
        return res;
    },

    // 删除文章
    async destroyArticle({state,commit}, params) {
        let res = await article.destroy(params)
        //console.log(res);
        return res;
    },
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}
