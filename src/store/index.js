import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    //全局的对象，保存公共数据
    state: {
        routers: []
    },
    //改变state 内值的方法 同步执行
    mutations: {
        initRouters(state, data) {
            state.routers = data;

        }
    },
    //改变state 内值的方法  异步执行
    actions: {},
    modules: {}
})
