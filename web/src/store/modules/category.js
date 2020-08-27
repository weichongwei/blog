import category from '../../API/category'

const state = {
    categoryList: [],
    categoryIndex:0
};
const mutations = {
    SET_CATEGORY_LIST(state, list) {
        state.categoryList = list
    },
    SET_CATEGORY_INDEX(state,data){
         state.categoryIndex = data;
    }
};
const actions = {
    async list({ commit, state }, params) {
        if (state.categoryList && state.categoryList.length > 0) {
            return state.categoryList;
        }
        let res = await category.list(params);
        let categoryList = res.data.categoryList;
        categoryList.unshift({name:'全部'})
        commit('SET_CATEGORY_LIST', categoryList)
        return categoryList
    }
};

export default {
    namespaced: true,
    state,
    mutations,
    actions
}