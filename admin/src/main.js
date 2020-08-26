import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ViewUI from 'view-design';
import 'view-design/dist/styles/iview.css';
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
Vue.use(mavonEditor);


Vue.use(ViewUI);
Vue.config.productionTip = false;

//全局的导航守卫
router.beforeEach(async (to,from,next)=>{
  const admin_token = localStorage.getItem('adminToken');
  if(admin_token){
    // 表示用户已登录 认证 放行 获取用户信息
    await store.dispatch('admin/adminAuth');
    next();
  }else{
    // 表示用户未登录
    if(to.meta.noAuth){
      next();
    }else{
      Vue.prototype.$Message.error('权限未授权');
      setTimeout(() => {
        next('/login');
      }, 1500);
    }
  }
})


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
