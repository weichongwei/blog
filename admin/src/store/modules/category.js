import category from "../../api/category";
const state = {};
const mutations = {}

const actions = {
    // 获取分类列表
    async getCategoryList({commit}, params) {
        let res = await category.list(params)
        //console.log(res);
        return res;
    },
    // 创建分类
    async createCategory({commit}, params) {
        let res = await category.create(params);
        console.log(res);
        return res;
    },
    // 更新分类
    async updateCategory({commit}, params) {
        let res = await category.update(params);
        //console.log(res);
        return res;
    },
    // 获取分类详情
    async getCategoryDetail({commit}, params) {
        let res = await category.detail(params);
        //console.log(res);
        return res;
    },
    // 删除分类
    async destroyCategory({commit}, params) {
        let res = await category.destory(params);
        //console.log(res);
        return res;
    }
}
export default {
    namespaced: true,
    state,
    mutations,
    actions
}