import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

import store from "../store";
import {Message} from "element-ui";

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        meta: {
            title: "首页-Flik,让生活,更生活"
        },
        component: Home
    }, {
        path: '/login',
        name: 'Login',
        meta: {
            title: "登录-Flik,让生活,更生活"
        },
        component: () => import("../views/user/Login")
    }, {
        path: '/about',
        name: 'About',
        meta: {
            title: "关于-Flik,让生活,更生活"
        },
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
    }, {
        path: '/Headers',
        name: 'Headers',
        component: () => import('../views/Headers')
    }, {
        path: '/LayoutFooter',
        name: 'LayoutFooter',
        component: () => import('../views/LayoutFooter')
    }, {
        path: '/sign',
        name: 'sign',
        component: () => import('../views/sign/Sign')
        // redirect:"/api/sign"
    }, {
        path: '/health',
        name: 'health',
        component: () => import('../views/sign/Health')
    }, {
        path: '/info',
        name: 'info',
        meta: {
            isLogin: true,
            title: "个人资料-Flik,让生活,更生活"
        },
        component: () => import('../views/user/SelfInfo')
    }, {
        path: '/articles',
        name:'articles',
        meta: {
            title: "文章-Flik,让生活,更生活"
        },
        component: () => import('../views/article/Article')
    }, {
        path: '/apis',
        name:'apis',
        meta: {
            title: "公共api分享-Flik,让生活,更生活"
        },
        component: () => import('../views/apis/Apis')
    }, {
        path: '/postArticle',
        name:'publishArticle',
        meta: {
            title: "发表文章-Flik,让生活,更生活"
        },
        component: () => import('../views/article/publishArticle')
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
    if (to.meta.isLogin) {
        if (window.sessionStorage.hasOwnProperty("token")) {
            next()
        } else {
            Message.error("尚未登录,请登录~")
            next({path: '/login'})
            return;
        }
    }
    next()
})