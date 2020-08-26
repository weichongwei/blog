import admin from '../../api/admin'
const state = {
    userInfo:{}
};
const mutations = {
    SET_USERINFO(state,data){
        state.userInfo = data.data.nickname
    },
};
const actions = {
    async adminLogin({commit},params){
        console.log('asasas');
        let res = await admin.login(params);
        return res;
    },
    async adminAuth({commit},params){
        let res = await admin.auth(params);
        commit('SET_USERINFO',res);
        return res;
    }
};
export default{
    namespaced:true,
    state,
    mutations,
    actions
}
