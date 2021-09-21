import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import Login from "../views/Login";

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    meta:{
      title:"首页-Flik,让生活,更生活"
    },
    component: Home
  },{
    path: '/login',
    name: 'Login',
    meta:{
      title:"登录-Flik,让生活,更生活"
    },
    component: Login
  },{
    path: '/about',
    name: 'About',
    meta:{
      title:"关于-Flik,让生活,更生活"
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },{
    path: '/Headers',
    name:'Headers',
    component: () =>import('../views/Headers')
  },{
    path: '/LayoutFooter',
    name:'LayoutFooter',
    component: () =>import('../views/LayoutFooter')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router

router.beforeEach((to, from, next) => {
  /* 路由发生变化修改页面title */
  if (to.meta.title) {
    document.title = to.meta.title
  }
  next()
})