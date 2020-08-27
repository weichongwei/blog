import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const originalPush = VueRouter.prototype.push
VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

const ArticleDetail = () => import('../views/article/ArticleDetail');
const ArticleList = () => import('../views/article/ArticleList');
const About = () => import('../views/About');
const Index = () => import('../views/login/Index')

const routes = [
  {
    path: '/',
    redirect: '/home',
    name: "home",
    component: () => import('@/views/Index.vue'),
    children: [
      {
        path: '/home',
        name: 'article-list',
        component: ArticleList
      },
      {
        path: '/article/detail',
        name: 'article-detail',
        meta: {
          requireAuth: true
        },
        component: ArticleDetail
      },
      {
        path: "/about",
        name: "About",
        component: About
      }
    ]
  },
  {
    path: '/login',
    name: 'login',
    component: Index
  }

];

const router = new VueRouter({
  routes,
  linkExactActiveClass: 'nav-item-active'
});

export default router;
