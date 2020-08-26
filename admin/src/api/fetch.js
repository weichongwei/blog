import axios from 'axios';
import qs from "qs";
import Vue from "vue";
let fetch = axios.create({
  baseURL: 'http://localhost:5000/api/v1',
  timeout: 1000,
})
// 添加请求拦截器
fetch.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  // 获取令牌 给后端
  const adminToken = localStorage.getItem('adminToken');
  if (adminToken) {
    // 设置请求头 Authorization
    config.headers.common.Authorization = `Bearer ${adminToken}`;
  }
  return config;
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error);
});
// 添加响应拦截器
fetch.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  // 关闭loading
  return response;
}, function (error) {
  const {
    response = {}
  } = error;
  console.log(response);
  if (response.status === 401) {
    Vue.prototype.$Message.error(response.data.msg);
    // Vue.prototype.$message.error(`${response.status} ${response.statusText} 请检查token`);
    localStorage.removeItem('admin_token');
    // setTimeout(() => {
    //   router.go(0);
    // }, 1500);
  } else if (response.status === 404) {
    Vue.prototype.$Message.error(response.data.msg);
  } else if (response.status === 500) {
    Vue.prototype.$Message.error('请告知后台人员 出错了');
  }
  // 对响应错误做点什么
  return Promise.reject(response);
  // 处于一个pending
  // return new Promise(() => {});
});



export default {
  get(url, params = {}) {
    return fetch({
      method: 'get',
      url,
      params
    })
  },
  post(url, params = {}) {
    return fetch({
      method: 'post',
      url,
      data: qs.stringify(params),
    })
  },
  put(url, params = {}) {
    return fetch({
      method: 'put',
      url,
      data: qs.stringify(params),
    })
  },
  delete(url, params = {}) {
    return fetch({
      method: 'delete',
      url,
      params
    })
  }
}