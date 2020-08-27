import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import './plugins/element.js';
import 'lib-flexible/flexible.js';

// 使用富文本编辑器
// use
import mavonEditor from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
// 图片懒加载插件
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload)
Vue.use(mavonEditor)
//路由守卫
router.beforeEach(async (to, from, next) => {
  const categoryIndex = localStorage.getItem('categoryIndex');
  if (categoryIndex) {
    store.commit('category/SET_CATEGORY_INDEX', categoryIndex);
    next();
  } else {
    next();
  }
  const token = localStorage.getItem('token')
  if (token) {

    await store.dispatch('admin/adminAuth');
    next()

  } else{
    if (to.meta.requireAuth) {
      next('/login')
    }
    next()
  }
})


Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
