import fetch from './fetch'
export default {
  // 登录
  login(params){
    return fetch.post('/admin/login',params);
  },

  // 认证 token
  auth(params){
    return fetch.get('/admin/getUser',params);
  }
}